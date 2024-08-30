export default function Footer(){

        return `
        <footer>
        <div style="max-width: 1160px;height: 300px; margin: auto; display: flex;justify-content: space-between; align-items: center; color: white;">
            <div class="footer_working">
                <h3 style="font-size: 24px;">Exclusive</h3>
                <p style="font-size: 20px;font-weight: bolder;">Subscribe</p>
                <p>Get 10% off your first order</p>
                <form style="position: relative;">
                    <input type="email" name="" id="" required style="width: 217px;height: 48px;background-color: transparent;border: 1px solid white;border-radius: 5px;padding: 0 15px;color: white;" placeholder="Enter your email">
                    <button type="submit" style="border: none;"><img src="/img/fly.png" alt="" style="position: absolute;top:30%;right: 7%;"></button>
                </form>
            </div>
            <div class="footer_address">
                <h4 style="font-size: 20px;">Support</h4>
                <p style="line-height: 30px;padding-top: 20px;">111 Bijoy sarani, Dhaka, <br> DH 1515, Bangladesh.</p>
                <p style="line-height: 50px;">exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
            </div>
            <div class="footer_account">
                <h4 style="font-size: 20px;padding-top:52px;">Account</h4>
                <p style="padding-top: 10px;">My Account</p>
                <p>Login / Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>
            </div>
            <div class="footer_link">
                <h4 style="font-size: 20px;padding-top:37px;">Quick Link</h4>
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
            </div>
            <div class="footer_app">
                <h4 style="font-size: 20px;line-height: 50px;">Download App</h4>
                <div>
                    <div style="width: 198px;height: 84px;">
                        <p style="font-size: 12px;color: #b3afaf;padding-top: 20px;">Save $3 with App New User Only</p>
                        <div style="display: flex;gap: 10px;align-items: center;margin-top: 10px;">
                            <img src="/img/qr.png" alt="">
                            <div>
                                <img src="/img/gg.png" alt="">
                                <img src="/img/store.png" alt="">
                            </div>
                        </div>
                        <div style="display: flex;justify-content: space-around;margin-top:20px;">
                            <img src="/img/fb.png" alt="">
                            <img src="/img/twitter.png" alt="">
                            <img src="/img/ig.png" alt="">
                            <img src="/img/in.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        `
       
}