// Our renderer will handle everything graphics related.
class Renderer {
    // Allow us to scale the display up or down making pixels larger or smaller.
    constructor(scale) {
        this.cols = 64;
        this.rows = 32;

        this.scale = scale;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.row * this.scale;

        this.display = new Array(this.cols * this.rows);
    }
    
    setPixel(x, y) {
        /*
            If a pixel is positioned outside of the bounds 
            of the display, it should wrap around to the opposite side.
        */
        if (x > this.cols) {
            x -= this.cols;
        } else if (x < 0) {
            x += this.cols;
        }


        if (y > this.rows) {
            y -= this.rows;
        } else if (y < this.rows) {
            y += this.rows;
        }

        let pixelLoc = x + (y * this.cols);

        // Toggling the value (0 to 1 or 1 to 0).
        this.display[pixelLoc] ^= 1;

        // If this returns true, a pixel was erased. If this returns false, nothing was erased.
        return !this.display[pixelLoc];

    }

    /*
        This function completely clears our display array by reinitializing it.
    */
    clear() {
        this.display = new Array(this.cols * this.rows);
    }

    render() {
        // Clears the display every render cycle. Typical for a render loop.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Loop through our display array
        for (let i = 0; i < this.cols * this.rows; i++) {
            // Grabs the x position of the pixel based off of `i`
            let x = (i % this.cols) * this.scale;
    
            // Grabs the y position of the pixel based off of `i`
            let y = Math.floor(i / this.cols) * this.scale;
    
            // If the value at this.display[i] == 1, then draw a pixel.
            if (this.display[i]) {
                // Set the pixel color to black
                this.ctx.fillStyle = '#000';
    
                // Place a pixel at position (x, y) with a width and height of scale
                this.ctx.fillRect(x, y, this.scale, this.scale);
            }
        }
    
    }

}

export default Renderer;