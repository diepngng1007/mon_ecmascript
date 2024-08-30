export default function Footer(){
    return `
    <div style="padding:5px;margin-top:10px;background-color:#343a40!important">
    <footer class="text-white">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Contact Us</h2>
                <p>Fill out the form below to get in touch:</p>
                
                <!-- Bootstrap Form -->
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Your Email">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea class="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Gửi</button>
                </form>
            </div>
            <div class="col-md-6">
                <h2>Address</h2>
                <p>123 Street Name, City, Country</p>
            </div>
        </div>
    </div>
</footer>
    </div>

    `
}