
import "@/css/homePage.css";
export default function  Home() {
  document.addEventListener("DOMContentLoaded",async () => {
    const images = ["./img/slide.jpg", "./img/slide1.jpg", "./img/slide2.jpg"];

    let currentSlide = 0;
    const time = 3000;

    function slideShow() {
      document.getElementById("slide").src = images[currentSlide];
      currentSlide = (currentSlide + 1) % images.length;
    }

    window.onload = function () {
      slideShow();
      setInterval(slideShow, time);
    };


    const dataProducts = await fetch("http://localhost:3000/products");
    const flashsale = await fetch("http://localhost:3000/flashsale");
    const jsonFlash = await flashsale.json()
    const date = jsonFlash.time
    const dateNow = Date.now();
    const dbJSON = await dataProducts.json();

    const Days =document.getElementById('Days')
    const Hours =document.getElementById('Hours')
    const Minutes =document.getElementById('Minutes')
    const Seconds =document.getElementById('Seconds')
    let sc =''
    let mn =''
    let hh =''
    let dd =''
    setInterval(()=>{
        const crurrentTime = Date.now();
        const timeDiff = date-crurrentTime ;
        const miliseconds =1000
        const timeMinute= 60
        const timeHours =60
        const timeDay = 24
        const  seconds = Math.floor(timeDiff/miliseconds)%timeMinute
        const  minute =  Math.floor(timeDiff/(timeMinute*miliseconds))%timeHours
        const hours =  Math.floor(timeDiff/(timeMinute*miliseconds*timeHours))%timeDay
        const day =  Math.floor(timeDiff/(timeMinute*miliseconds*timeHours*timeDay))
       if(dd==day){
        dd=day 
       }else{
        Days.innerHTML = day
        dd=day
       }
       if(hh==hours){
        hh=hours
       }else{
        Hours.innerHTML = hours
        hh=hours
       }
       if(mn==minute){
        mn=minute
       }else{
        Minutes.innerHTML = minute
        mn=minute
       }
       if(sc==seconds){
        sc=seconds
       }else{
        Seconds.innerHTML = seconds
        sc=seconds
       }
    },1000)
    const product_month__item = document.querySelector(".product_month__item");
    let htmlBestSell = ``;
    const srtArr = dbJSON.sort((a, b) => {
      if (Number(a.purchase) > Number(b.purchase)) {
        return -1;
      }
    });
    srtArr.slice(0, 4).forEach((item, index) => {
      htmlBestSell += `  <div class="product_month__block" class="hover_btn">
                <div  onclick="detailProduct('${item.id}')"  class="product-container__month" style="background-color: #F5F5F5; width: 270px; height: 250px; position: relative;">
                    <div style="display: flex; justify-content: center;">
                        <img src="${item.image}" alt="" style="width: 150px; height: 132px; margin-top: 50px;" class="img">
                    </div>
                    <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute; top: 5%; right: 2%;">
                        <img src="/img/heart.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                    </div>
                    <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute;top: 22%; right: 2%;">
                        <img src="/img/eye.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                    </div>
                    <div class="btn-check"><button >Add to cart</button></div>
                </div>
                <div style="margin-top: 18px;">
                <h3  style="font-size: 16px;">${item.name}</h3>
                <span style="color: #DB4444; line-height: 38px;">${item.price} <s style="color: #a5a5a5"> ${item.price_origin}</s></span>
                    <div style="display: flex;">
                        <img src="/img/${item.rate}star.png" alt="">
                        <p style="color: #a5a5a5; font-size: 14px; padding-left: 10px;">(${item.purchase})</p>
                    </div>
                </div>
            </div>`;
    });

    product_month__item.innerHTML = htmlBestSell;
    // product flashsale



    const product_today__items = document.querySelector(
        ".product_today__items"
      );
      const viewAllProduct = document.querySelector(
        ".product_today__viewproduct button"
      );
  
      let html = ``;
  
      dbJSON &&dbJSON.filter(item=>item&&item.flashsale ).slice(0, 4).forEach((item, index) => {
       if(dateNow<date){
        
        html += `
        <div class="product_month__block" class="hover_btn">
        <div onclick="detailProduct('${item.id}')"  class="product-container__item" style="background-color: #F5F5F5; width: 270px; height: 250px; position: relative;">
    <div style="display: flex; justify-content: center;">
        <img src="${item.image}" alt="" style="width: 150px; height: 132px; margin-top: 50px;" class="img">
    </div>
    <div style="background-color: #DB4444;width: 55px;height: 26px;font-size: 12px;color: white;border-radius: 3px;text-align: center;padding-top: 5px;position: absolute;top: 5%;left: 5%;"><p>-40%</p></div>
    <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute; top: 5%; right: 2%;">
        <img src="/img/heart.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
    </div>
    <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute;top: 22%; right: 2%;">
        <img src="/img/eye.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
    </div>
    <div class="btn-check"><button>Add to cart</button></div>
        </div>
        <div style="margin-top: 18px;">
        <h3 style="font-size: 16px;">${item.name}</h3>
         <span style="color: #DB4444; line-height: 38px;">${item.price} <s style="color: #a5a5a5"> ${item.price_origin}</s></span>
    <div style="display: flex;">
        <img src="/img/${item.rate}star.png" alt="">
        <p style="color: #a5a5a5; font-size: 14px; padding-left: 10px;">(${item.purchase})</p>
    </div>
</div>
</div>

`
       }
           
        });
      product_today__items.innerHTML = html;
  
      viewAllProduct.addEventListener("click", (event) => {
        const valueBtn = event.target.textContent;
        if (valueBtn === "Close Product") {
          product_today__items.style = "overflow-y:hidden";
          let lastHTML = "";
          dbJSON &&
          dbJSON.filter(item=>item&&item.flashsale ).slice(0, 4).forEach((item, index) => {
                if(dateNow<date){
                    lastHTML += `
                    <div class="product_month__block" class="hover_btn">
                    <div onclick="detailProduct('${item.id}')"   class="product-container__item" style="background-color: #F5F5F5; width: 270px; height: 250px; position: relative;">
                        <div style="display: flex; justify-content: center;">
                            <img src="${item.image}" alt="" style="width: 150px; height: 132px; margin-top: 50px;" class="img">
                        </div>
                        <div style="background-color: #DB4444;width: 55px;height: 26px;font-size: 12px;color: white;border-radius: 3px;text-align: center;padding-top: 5px;position: absolute;top: 5%;left: 5%;"><p>-40%</p></div>
                        <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute; top: 5%; right: 2%;">
                            <img src="/img/heart.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                        </div>
                        <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute;top: 22%; right: 2%;">
                            <img src="/img/eye.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                        </div>
                        <div class="btn-check"><button>Add to cart</button></div>
                    </div>
                    <div style="margin-top: 18px;">
                      <h3 style="font-size: 16px;">${item.name}</h3>
                      <span style="color: #DB4444; line-height: 38px;">${item.price} <s style="color: #a5a5a5"> ${item.price_origin}</s></span>
                        <div style="display: flex;">
                            <img src="/img/${item.rate}star.png" alt="">
                            <p style="color: #a5a5a5; font-size: 14px; padding-left: 10px;">(${item.purchase})</p>
                        </div>
                    </div>
                    </div>`;
                }
             
            });
          product_today__items.innerHTML = lastHTML;
  
          viewAllProduct.textContent = "View All Products";
        } else {
          let lastHtml2 = ``;
          dbJSON &&
          dbJSON.filter(item=>item&&item.flashsale ).forEach((item, index) => {
                if(dateNow<date){
                    lastHtml2 += `
              
                    <div class="product_month__block" class="hover_btn">
                    <div onclick="detailProduct('${item.id}')" class="product-container__item" style="background-color: #F5F5F5; width: 270px; height: 250px; position: relative;">
                        <div style="display: flex; justify-content: center;">
                            <img src="${item.image}" alt="" style="width: 150px; height: 132px; margin-top: 50px;" class="img">
                        </div>
                        <div style="background-color: #DB4444;width: 55px;height: 26px;font-size: 12px;color: white;border-radius: 3px;text-align: center;padding-top: 5px;position: absolute;top: 5%;left: 5%;"><p>-40%</p></div>
                        <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute; top: 5%; right: 2%;">
                            <img src="/img/heart.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                        </div>
                        <div style="background-color: white; width: 34px; height: 34px; border-radius: 50%; position: absolute;top: 22%; right: 2%;">
                            <img src="/img/eye.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px;">
                        </div>
                        <div class="btn-check"><button>Add to cart</button></div>
                    </div>
                    <div style="margin-top: 18px;">
                      <h3 style="font-size: 16px;">${item.name}</h3>
                      <span style="color: #DB4444; line-height: 38px;">${item.price} <s style="color: #a5a5a5"> ${item.price_origin}</s></span>
                        <div style="display: flex;">
                            <img src="/img/${item.rate}star.png" alt="">
                            <p style="color: #a5a5a5; font-size: 14px; padding-left: 10px;">(${item.purchase})</p>
                        </div>
                    </div>
                    </div>`;
                }
            
            });
          product_today__items.innerHTML = lastHtml2;
          product_today__items.style = "overflow-y:scroll;height:750px";
          viewAllProduct.textContent = "Close Product";
        }
      });
        const elScript = document.createElement("script");
         let script = `function detailProduct(id){
          const formatID = id.replace("#","")
         window.location.href ="/product/"+formatID;
        }`;
         elScript.innerHTML = script;
          document.body.appendChild(elScript);


      
  });

  return `
    <div class="container">
  
    <div class="sub_container" style="margin: 80px;">
        <hr>
        <div class="banner">
            <img alt="" id="slide">
        </div>
        <article class="product_today">
            <div class="product_today__title">
                <div style="width: 20px;height: 40px;background-color: #DB4444;border-radius: 3px;"></div>
                <div style="display: inline;margin-left: 18px;color:#DB4444;font-weight: bold;">Today’s</div>
            </div>
            <div class="product_today__flash">
                <div style="display: flex;">
                    <h1 style="font-size: 36px;">Flash Sales</h1>
                    <div style="display:flex;margin-left: 70px;">
                        <div style="padding: 0 20px;">
                            <div><p  style="font-size: 12px;font-weight: bold;">Days</p><h1 id="Days" style="text-align: center;font-size: 32px;"> <span style="position: absolute;right: 63.1%;color:#DB4444">:</span></h1></div>
                        </div>
                        <div></div>
                        <div style="padding: 0 20px;">
                            <div><p  style="font-size: 12px;font-weight: bold;">Hours</p><h1 id="Hours" style="text-align: center;font-size: 32px;"><span style="position: absolute;right: 58.5%;color:#DB4444">:</span></h1></div>
                        </div>
                        <div style="padding: 0 20px;">
                            <div><p  style="font-size: 12px;font-weight: bold;">Minutes</p><h1 id="Minutes" style="text-align: center;font-size: 32px;"><span style="position: absolute;right: 53.2%;color:#DB4444">:</span></h1></div>
                        </div>
                        <div style="padding: 0 20px;">
                            <div><p  style="font-size: 12px;font-weight: bold;">Seconds</p><h1 id="Seconds" style="text-align: center;font-size: 32px;"></h1></div>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="width: 46px;height: 46px;background-color: #F5F5F5;margin-right: 15px;padding:13px 12px;border-radius: 50%;"><img src="./img/left.png" alt=""></div>
                    <div style="width: 46px;height: 46px;background-color: #F5F5F5;padding:13px 12px;border-radius: 50%;"><img src="./img/right.png" alt=""></div>
                </div>
            </div>
            <div class="product_today__items">
          
                    
                   




            </div>
            <div  class="product_today__viewproduct" style="display: flex;justify-content: center;margin-top: 50px;">
            <button style="width: 234px;height: 56px;background-color: #DB4444;border:1px solid transparent;color: white;border-radius: 5px;">View All Products</button>
        </div>
        </article>
        <article class="product_categories">
            <div class="product_categories__title">
                <div style="width: 20px;height: 40px;background-color: #DB4444;border-radius: 3px;"></div>
                <div style="display: inline;margin-left: 18px;color:#DB4444;font-weight: bold;">Categories</div>
            </div>
            <div class="product_categories__pagecontrol" style="margin-top: 15px;margin-bottom:50px;">
                <h1 style="font-size: 36px;">Browse By Category</h1>
                <div style="display: flex;">
                    <div style="width: 46px;height: 46px;background-color: #F5F5F5;margin-right: 15px;padding:13px 12px;border-radius: 50%;"><img src="./img/left.png" alt=""></div>
                    <div style="width: 46px;height: 46px;background-color: #F5F5F5;padding:13px 12px;border-radius: 50%;"><img src="./img/right.png" alt=""></div>
                </div>
            </div>
            <div class="product_categories__itemcate">
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/phone.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Phones</span></div>
                </div>
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/com.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Computers</span></div>
                </div>
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/watch.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Computers</span></div>
                </div>
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/camera.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Computers</span></div>
                </div>
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/head.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Computers</span></div>
                </div>
                <div style="border: 1px solid #d4d0d0;width: 170px;height: 145px;padding-top: 28px;border-radius: 5px;">
                    <div style="display: flex;justify-content: center;">
                        <img src="./img/gaming.png" alt="" style="width: 56px;height: 56px;">
                    </div>
                    <div style="display: flex;justify-content: center;padding-top: 15px;font-weight: bold;"><span>Computers</span></div>
                </div>
            </div>
        </article>
        <hr style="display: block;margin: 60px auto;width: 76%;border: none;border-top: 1px solid #dedede;background-color: #F5F5F5;">
        <article class="product_month">
            <div class="product_month__title">
                <div style="width: 20px;height: 40px;background-color: #DB4444;border-radius: 3px;"></div>
                <div style="display: inline;margin-left: 18px;color:#DB4444;font-weight: bold;">This Month</div>
            </div>
            <div class="product_month__best">
                <h1 style="font-size: 36px;">Best Selling Products</h1>
                <div><button style="width: 159px;height:56px;background-color: #DB4444;border-radius: 5px;border: 1px solid transparent;color:white;">View All</button></div>
            </div>        
            <div class="product_month__item">
              
                  
            </div>
        </article>
        <section class="sub_banner">
            <div class="sub_banner__title">
                <h4 style="color:#00FF66;padding-bottom: 20px;">Categories</h4>
                <h1 style="font-size: 48px;padding-bottom: 20px;">Enhance Your <br> Music Experience</h1>
                <div style="display: flex;justify-content: space-between;width: 320px;padding-bottom: 35px;">
                    <div style="border-radius: 50%;background-color: white;width: 62px;height: 62px;color: #000000;text-align: center;padding-top: 10px;cursor: pointer;"><h4>23</h4><p style="font-size: 11px;">Hours</p></div>
                    <div style="border-radius: 50%;background-color: white;width: 62px;height: 62px;color: #000000;text-align: center;padding-top: 10px;cursor: pointer;"><h4>05</h4><p style="font-size: 11px;">Days</p></div>
                    <div style="border-radius: 50%;background-color: white;width: 62px;height: 62px;color: #000000;text-align: center;padding-top: 10px;cursor: pointer;"><h4>59</h4><p style="font-size: 11px;">Minutes</p></div>
                    <div style="border-radius: 50%;background-color: white;width: 62px;height: 62px;color: #000000;text-align: center;padding-top: 10px;cursor: pointer;"><h4>35</h4><p style="font-size: 11px;">Seconds</p></div>
                </div>
                <div style="background-color: #00FF66;color:white;width: 170px;height: 56px;text-align: center;padding-top: 15px;border-radius: 5px;cursor: pointer;">Buy Now!</div>
            </div>
            <div class="sub_banner__img"><img src="./img/noisy.png" alt=""></div>
        </section>
        
        <article class="flex_feature">
            <div class="flex_feature__title">
                <div style="width: 20px;height: 40px;background-color: #DB4444;border-radius: 3px;"></div>
                <div style="display: inline;margin-left: 18px;color:#DB4444;font-weight: bold;">Featured</div>
            </div>
            <div class="flex_feature__heading">
                <h1 style="font-size: 36px;">New Arrival</h1>
            </div>
            <div class="flex_feature__box">
                <div class="feature_box__item">
                    <img src="./img/control3.png" alt="" style="width: 507px;height: 507px;position: absolute;bottom: 0;left: 5%;">
                    <div style="color:white;position: absolute;bottom: 5%;left: 4%;">
                        <h3 style="line-height: 50px;font-size: 24px;">PlayStation 5</h3>
                        <p style="font-size: 14px;padding-bottom: 10px;">Black and White version of the PS5 <br> coming out on sale.</p>
                        <div style="border-bottom:1px solid white;display: inline-block;">
                            <a href="#" style="text-decoration:none;color:white;font-weight: 600;"><p>Shop Now</p></a>
                        </div>
                    </div>
                </div>
                <div class="feature_box__items">
                    <div class="item_flex">
                        <div style="width: 270px;height: 112px;position: absolute;bottom:14%;left: 4%;">
                            <h3 style="font-size: 24px;line-height: 50px;">Women’s Collections</h3>
                            <p style="font-size: 14px;padding-bottom: 10px;">Featured woman collections that <br> give you another vibe.</p>
                            <div style="border-bottom:1px solid white;display: inline-block;">
                                <a href="#" style="text-decoration:none;color:white;font-weight: 600;"><p>Shop Now</p></a>
                            </div>
                        </div>
                        <div style="position: absolute;right: 0;">
                            <img src="./img/women.png" alt="" style="width: 285px;height: 284px;">
                        </div>
                    </div>
                    <div style="display: flex;gap: 30px;margin-top: 30px;">
                        <div style="background-color: #000000;width: 270px;height: 284px;color: white;position: relative;">
                            <div style="display: flex;justify-content: center;padding-top: 25px;">
                                <img src="./img/speaker.png" alt="" style="width: 190px;height: 221px;">
                            </div>
                            <div style="width: 191px;height: 85px;position: absolute;bottom: 16%;left: 9%;">
                                <h3 style="font-size: 24px;line-height: 50px;">Speakers</h3>
                                <p style="font-size: 14px;padding-bottom: 10px;">Amazon wireless speakers</p>
                                <div style="border-bottom:1px solid white;display: inline-block;">
                                    <a href="#" style="text-decoration:none;color:white;font-weight: 600;"><p>Shop Now</p></a>
                                </div>
                            </div>
                        </div>
                        <div style="background-color: #000000;width: 270px;height: 284px;color: white;position: relative;">
                            <div style="display: flex;justify-content: center;padding-top: 25px;">
                                <img src="./img/perfume.png" alt="" style="width: 201px;height: 203px;">
                            </div>
                            <div style="width: 191px;height: 85px;position: absolute;bottom: 16%;left: 9%;">
                                <h3 style="font-size: 24px;line-height: 50px;">Perfume</h3>
                                <p style="font-size: 14px;padding-bottom: 10px;">GUCCI INTENSE OUD EDP</p>
                                <div style="border-bottom:1px solid white;display: inline-block;">
                                    <a href="#" style="text-decoration:none;color:white;font-weight: 600;"><p>Shop Now</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <div class="home_service">
            <div style="">
                <div style="display: flex;justify-content: center;position: relative;">
                    <div><img src="./img/tron1.png" alt=""></div>
                    <img src="./img/mini0.png" alt=""  style="position: absolute;top: 28px;">
                </div>
                <div style="text-align: center;margin-top: 15px;line-height: 30px;">
                    <h3 style="font-size: 20px;">FREE AND FAST DELIVERY</h3>
                    <p style="font-size: 14px;">Free delivery for all orders over $140</p>
                </div>
            </div>
            <div>
                <div style="display: flex;justify-content: center;position: relative;">
                    <div><img src="./img/tron1.png" alt=""></div>
                    <img src="./img/mini2.png" alt="" style="position: absolute;top: 20px;">
                </div>
                <div style="text-align: center;margin-top: 15px;line-height: 30px;">
                    <h3 style="font-size: 20px;">24/7 CUSTOMER SERVICE</h3>
                    <p style="font-size: 14px;">Friendly 24/7 customer support</p>
                </div>
            </div>
            <div>
                <div style="display: flex;justify-content: center;position: relative;">
                    <div><img src="./img/tron1.png" alt=""></div>
                    <img src="./img/mini1.png" alt="" style="position: absolute;top: 20px;">
                </div>
                <div style="text-align: center;margin-top: 15px;line-height: 30px;">
                    <h3 style="font-size: 20px;">MONEY BACK GUARANTEE</h3>
                    <p style="font-size: 14px;">We reurn money within 30 days</p>
                </div>
            </div>
        </div>
        <div style="display: flex;width: 100%;justify-content: end;margin: auto;">
            <div style="width: 46px;height: 46px;background-color: #F5F5F5;margin-right: 15px;padding:13px 12px;border-radius: 50%;"><img src="./img/top.png" alt="" style="padding: 2px 2px;"></div>
        </div>
        
    </div>
    
</div>
    `;
}
