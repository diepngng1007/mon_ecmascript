import NavUser from "./nav";

export default function Header(){
    return `
    <header style="display: flex; justify-content: center; align-items: center; width: 100%; height: 48px; background-color: #000000; position: fixed; top: 0; left: 0;z-index: 99999;">
        <div style="width: 1170px; margin: 0 auto;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; color: white;width: 550px;margin: auto;">
                <p style="padding-right: 12px; font-size: 14px;">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <a href="#" style="color: white; font-size: 14px; font-weight: bold;">Shop Now</a>
            </div>
            <select name="" id="">
                <option value="">English</option>
                <option value="">Vietnamese</option>
                <option value="">Japanese</option>
            </select>
          </div>
        </div>
    </header>
    ${NavUser()}
    `
}