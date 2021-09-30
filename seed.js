const mongoose = require("mongoose");
const Customer = require("./Models/UserSchema");

mongoose.connect("mongodb+srv://ompandey:ompandey@cluster0.sgwep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("error", err);
    })

const v = async () => {
    await Customer.deleteMany({});
    await Customer.insertMany([{
        username: "shivanshu_singh5804", email: "009aceh.cum@gmail.com", Balance: 500, avatar: "/img/mach.jpg", contact: 8219232323, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ."
    }, {
        username: "__aaddiii___", email: "potato.single.com", Balance: 500, avatar: "/img/adi.jpg", contact: 7712400440, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    }, {
        username: "abhigyan2001", email: "dewdewa@gmail.com", Balance: 500, avatar: "/img/abhi.jpg", contact: 8823324064, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "aman_01_7", email: "boomn78@gmail.com", Balance: 500, avatar: "/img/aman.jpg", contact: 7790422189, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam."
    },
    {
        username: "Business_man", email: "Ram_naresh@gmail.com", Balance: 500, avatar: "/img/jai.jfif", contact: 6631123098, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "s.t.a.r.b.o.u.y", email: "hello@gmail.com", Balance: 500, avatar: "/img/saya.jpg", contact: 8234580971, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "solo_thinker_134", email: "big.koc@gmail.com", Balance: 500, avatar: "/img/solo.jpg", contact: 2098453187, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam."
    }]);
};

v();