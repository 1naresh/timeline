
import ReactDOM from 'react-dom';

// const loadImage = url => {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.onerror = () => reject(new Error(`load ${url} fail`));
//         img.src = url;
//     });
// };

export const depict = (options, ref, cnvs_fabric) => {
    let img1 = new Image()
    let img2 = new Image()
    let cnt = 2
    let canvas = ReactDOM.findDOMNode(ref)
    let ctx = canvas.getContext("2d"); 
    ctx.globalCompositeOperation = "source-over";
    img1.onload = img2.onload = function () {
        if (!--cnt) go()
    };
    img1.src =  "/design_images/front/"+ options.bg +".png"       // sofa  1765 * 2791
    img2.src =  "/design_images/fabrics/"+ options.fabric +".png"   // pattern

    function go() {
        ctx.fillStyle = ctx.createPattern(img2, "repeat");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(img1, 0, 0, options.sw * .5, options.sh * .5);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(img1, 0, 0, options.sw * .5, options.sh * .5);
    }
    // const ctx = ReactDOM.findDOMNode(ref).getContext('2d');
    // let img = new Image()
    // img.onload = () => {
    //     if (options.globalCompositeOperation) ctx.globalCompositeOperation = options.globalCompositeOperation;
    //     ctx.drawImage(img, 0, 0, options.sw, options.sh)
    //     if (cnvs_fabric) {
    //         let imageData = ctx.getImageData(0, 0, 319, 295);
    //         let data = imageData.data;
    //         let color = hexToRgb(cnvs_fabric)
    //         for (let i = 0; i < data.length; i += 4) {
    //             data[i] = data[i] - (255 - color.r)
    //             data[i + 1] = data[i + 1] - (255 - color.g)
    //             data[i + 2] = data[i + 2] - (255 - color.b)
    //         }
    //         ctx.putImageData(imageData, 0, 0);
    //     }
    // }
    // img.src = options.uri
}
export const hexToRgb = hex => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
export const fillColor = (options, ref, cnvs_fabric) => {
    const ctx = ReactDOM.findDOMNode(ref).getContext('2d');
    let img = new Image()
    img.onload = () => {
        ctx.globalCompositeOperation = "source-in"
        ctx.drawImage(img, 0, 0, options.sw, options.sh)
        let imageData = ctx.getImageData(0, 0, options.sw, options.sh);
        let data = imageData.data;
        let color = hexToRgb(cnvs_fabric)
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] - (255 - color.r)
            data[i + 1] = data[i + 1] - (255 - color.g)
            data[i + 2] = data[i + 2] - (255 - color.b)
        }
        ctx.putImageData(imageData, 0, 0);
    }
    img.src = options.uri
}