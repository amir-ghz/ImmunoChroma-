document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById("image1").addEventListener("change", handleImage);
document.getElementById("image2").addEventListener("change", handleImage);

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.addEventListener("click", (e) => {
                const x = e.offsetX;
                const y = e.offsetY;
                const { data } = ctx.getImageData(x, y, 1, 1);
                document.getElementById("rgb-output").textContent =
                    `RGB: (${data[0]}, ${data[1]}, ${data[2]})`;
            });
        };
        img.src = URL.createObjectURL(file);
    }
}
