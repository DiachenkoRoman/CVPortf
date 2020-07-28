let uploader = document.getElementById('uploader'),
imagesList = document.querySelector('.images'),
images = JSON.parse(localStorage.getItem("imgs")) || [];
function uploadImage() {
let files = this.files, i, fileLength = files.length, image;
if(FileReader) {
  for(i = 0; i < fileLength; i += 1) {
      let fileReader = new FileReader(), file = files[i];
      fileReader.addEventListener('load', function (event) {
          image = {};
          image['name'] = file.name;
          image['size'] = file.size;
          image['url'] = event.target.result;
          image['index'] = images.length
          images.push(image);
          displayImages(images, imagesList);
          localStorage.setItem("imgs", JSON.stringify(images))
      })
      fileReader.readAsDataURL(file);
  }
}
}
displayImages(images, imagesList);
uploader.addEventListener('change', uploadImage, false);
