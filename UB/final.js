var Char = {
    pic: localStorage.getItem("NewPic"),
    ero: Number(localStorage.getItem("NewEro")),
    ugy: Number(localStorage.getItem("NewUgy")),
    esz: Number(localStorage.getItem("NewEsz")),
    arm: Number(localStorage.getItem("NewArm")),
    seb: Number(localStorage.getItem("NewSeb")),
};
const pia = (localStorage.getItem("NewPia") == "true") ? true : false;
const koc = (localStorage.getItem("NewKoc") == "true") ? true : false;
const bom = Boolean(localStorage.getItem("NewBom") == "true") ? true : false;
const alt = Boolean(localStorage.getItem("NewAlt") == "true") ? true : false;
