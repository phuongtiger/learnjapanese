// for button
var toggleButton = document.getElementById('toggle-sidebar');
var scrollSidebar = document.getElementById('scroll-sidebar');
var myElement = document.getElementById("main");
var width = myElement.offsetWidth;
var timeout = setTimeout(hideMenu, 5000);
var checkTimeOut = false;

function handleResize() {
    width = myElement.offsetWidth;
    if(width > 500){
        toggleButton.style.opacity = 1;
    }else{
        timeout = setTimeout(hideMenu, 5000);
    }
}
window.addEventListener("resize", handleResize);
// Thiết lập hàm ẩn menu
function hideMenu() {
    if(width<500){
        toggleButton.style.opacity = 0.1; // Thiết lập độ mờ cho nút menu
    }
}
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 350) {
        toggleButton.style.display = 'block';
        if(checkTimeOut == false){
            timeout = setTimeout(hideMenu, 5000);
            toggleButton.style.opacity = 1;
            checkTimeOut = true;
        }
    } else {
        clearTimeout(timeout);
        scrollSidebar.style.display = 'none';
        toggleButton.style.display = 'none';
        checkTimeOut = false;
    }
});

toggleButton.addEventListener('click', function () {
    clearTimeout(timeout);
    if (scrollSidebar.style.display === 'none') {
        scrollSidebar.style.display = 'block';
        toggleButton.style.opacity = 1;
    } else {
        scrollSidebar.style.display = 'none';
        timeout = setTimeout(hideMenu, 5000);
    }
});


