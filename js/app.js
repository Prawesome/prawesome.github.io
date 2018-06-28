/* 
    Typing Animation from https://codepen.io/hi-im-si/pen/DHoup
*/
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

var elements = document.getElementsByClassName('typewrite');
for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
    }
}

// INJECT CSS FOR TYPING ANIMATION
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".typewrite > .wrap { border-right: 0.05em solid #fff}";
document.body.appendChild(css);

//Custom fadeIn function other than the one provided by jQuery, taken from StackOverflow
function fadeIn(el, duration, display) {
    var s = el.style,
        step = 25 / (duration || 300);
    s.opacity = s.opacity || 0;
    s.display = display || "block";
    (function fade() {
        (s.opacity = parseFloat(s.opacity) + step) > 0.6 ? s.opacity = 0.6 : setTimeout(fade, 25);
    })();
}

//Custom fadeOut function other than the one provided by jQuery, taken from StackOverflow
function fadeOut(el, duration) {
    var s = el.style,
        step = 25 / (duration || 300);
    s.opacity = s.opacity || 1;
    (function fade() {
        (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
    })();
}

//Helper functions for class manipulations
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}

let contact = document.querySelector('.contact');
let contactPopup = document.querySelector('.contact-popup-outter');
contact.addEventListener('click', function () {
    fadeIn(contactPopup, 1000, 'flex');
});

let cross = document.querySelector('.close-cross');
cross.addEventListener('click', function () {
    fadeOut(contactPopup, 1000);
});

document.addEventListener('keyup', function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
        fadeOut(contactPopup, 1000);
    }
});

document.querySelector('#screen-2-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#screen-2').scrollIntoView({
        behavior: 'smooth'
    });
});