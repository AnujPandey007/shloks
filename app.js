// Imports
const express = require('express');
const app = express();
const port = 3000;

// const scriptFile = require("../First Web App/public/js/script.js");
// console.log(scriptFile.adminName);
// console.log(scriptFile.getAvg([1,5]));

const abouts = [
    {
        id: 1, 
        sanskrit: "“श्रेयान् स्वधर्मो विगुणः परधर्मात् स्वनुष्टितात्।\n स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥”",
        hindi: "अपने नियतकर्मों को दोषपूर्ण ढंग से सम्पन्न करना भी अन्य के कर्मों को भलीभाँति करने से श्रेयस्कर है।\n स्वीय कर्मों को करते हुए मरना पराये कर्मों में प्रवृत्त होने की अपेक्षा श्रेष्ठतर है, क्योंकि अन्य किसी के मार्ग का अनुसरण भयावह होता है॥",
        english: "It is far better to live your own destiny, duties, and nature imperfectly than to live an imitation of someone else’s with perfection. Even death in your own nature is better; imitation of others is fraught with danger.",
        name: "Krishn"
    },
    {
        id: 2, 
        sanskrit: "“देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\n तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥”",
        hindi: "जैसे इस देह में देही जीवात्मा की कुमार, युवा और वृद्धावस्था होती है वैसे ही उसको अन्य शरीर की प्राप्ति होती है। धीर पुरुष इसमें मोहित नहीं होता है।",
        english: "Just as the boyhood, youth and old age come to the embodied Soul in this body, in the same manner, is the attaining of another body; the wise man is not deluded at that.",
        name: "Krishn"
    },
    {
        id: 3, 
        sanskrit: "“य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्।\n उभौ तौ न विजानीतो नायं हन्ति न हन्यते॥”",
        hindi: "जो आत्मा को मारने वाला समझता है और जो इसको मरा समझता है वे दोनों ही नहीं जानते हैं, क्योंकि यह आत्मा न मरता है और न मारा जाता है।",
        english: "He who thinks that the soul kills, and he who thinks of it as killed, are both ignorant. The soul kills not, nor is it killed.",
        name: "Krishn"
    },
    {
        id: 4, 
        sanskrit: "“न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥”",
        hindi: "आत्मा किसी काल में भी न जन्मता है और न मरता है और न यह एक बार होकर फिर अभावरूप होने वाला है। आत्मा अजन्मा, नित्य, शाश्वत और पुरातन है, शरीर के नाश होने पर भी इसका नाश नहीं होता।",
        english: "The soul is never born, it never dies having come into being once, it never ceases to be. Unborn, eternal, abiding and primeval, it is not slain when the body is slain.",
        name: "Krishn"
    },
    {
        id: 5, 
        sanskrit: "“वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णा- न्यन्यानि संयाति नवानि देही॥”",
        hindi: "जैसे मनुष्य जीर्ण वस्त्रों को त्यागकर दूसरे नये वस्त्रों को धारण करता है वैसे ही देही जीवात्मा पुराने शरीरों को त्याग कर दूसरे नए शरीरों को प्राप्त होता है।",
        english: "As a man casts off worn-out garments and puts on others that are new, so does the soul cast off its worn-out bodies and enter into others that are new.",
        name: "Krishn"
    }
];

// Static Files
app.use(express.static('public'));
app.use(express.json());
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index', {sanskrit: abouts[0].sanskrit, hindi: abouts[0].hindi});
});

app.get('/about', (req, res) => {
    res.render('about', { text: 'About Page'});
});

//API 
app.post("/about/addAbout", (req, res)=> {
    let userInputName = req.body.name;

    if(!userInputName || userInputName.length <= 3){
        res.status(404).send("Name Should be more than 3+.");
        return; //ending it here without going further or use else part
    }

    const about = {
        id: abouts.length+1,
        name: userInputName
    };
    abouts.push(about);
    res.send(about);
});

app.put("/about/updateAbout/:id", (req,res)=>{
    const about = abouts.find(a=> a.id === parseInt(req.params.id));
    if(!about){
        res.status(404).send("Course not found");
        return;
    }

    let userInputName = req.body.name;

    if(!userInputName || userInputName.length <= 3){
        res.status(404).send("Name Should be more than 3+.");
        return;
    }

    about.name = userInputName;
    res.send(about);
});

app.delete("/about/deleteAbout/:id", (req, res)=> {
    const about = abouts.find(a=> a.id === parseInt(req.params.id));
    if(!about){
        res.status(404).send("Course not found");
        return;
    }

    const index = abouts.indexOf(about);

    abouts.splice(index, 1);
    res.send(about);
});

app.get('/about/getAbout/:id', (req, res) => {
    const about = abouts.find(a=> a.id === parseInt(req.params.id));
    if(!about){
        res.status(404).send("Course not found");
    }else{
        res.send(about);
    }
});

app.get('/about/getAll', (req, res) => {
    res.send(abouts);
});

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port http://localhost:${port}`));