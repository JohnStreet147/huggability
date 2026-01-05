
const hiddenOnLoad = document.getElementById("result");

const showScore = document.getElementById("score");
const showComment = document.getElementById("score-comment");

document.addEventListener("DOMContentLoaded", () => {
    if (hiddenOnLoad) {
        hiddenOnLoad.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    
    

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const formData = new FormData(form);
        const name = formData.get("name");

        let [score, comment] = getScore(name);


        score = Math.round(score * 100)
        if (comment === undefined) {
            comment = getComment(score)
        }


        animateNeedleTo(score);

        hiddenOnLoad.style.display = "";

        showScore.textContent = score;
        showComment.textContent = comment;
    });
});








function getComment(score){
    const huggabilityComments = [
        "Completely unhuggable – approach at your own risk!","Still not a hugger… maybe a high-five instead.","Hug attempts likely to fail.","Warning: hugs may bounce off.","Very un-huggy, proceed cautiously.","Only hug if desperate.","Slightly squeezable, but very slightly.","Tentative hug possible… with armor.","Could hug… but gloves recommended.","Hugging is an extreme sport here.","Hard pass – hugs may result in minor injury.","Hug attempt might cause awkwardness.","Hug potential: very low, but not zero.","Hugging discouraged unless brave.","Hugging possible… if very careful.","Hug may cause mild embarrassment.","Hugable-ish, like a stiff pillow.","Hug attempts may require negotiation.","Hug cautiously, minor risk of disappointment.","Hug… maybe, if motivated.","Eh… maybe if you have protective gear.","Hug is technically feasible.","Slightly hug-able, like a cactus.","Hug attempts could be awkward but okay.","Mildly hug-worthy.","Hug at your own risk… but doable.","Hug potential is slowly rising.","Hug cautiously, results may vary.","Hug attempts could bring minor joy.","Hug threshold almost reached.","Tentatively hugable – bring a helmet.","Hug possible with minor optimism.","Hug may improve mood slightly.","Hug cautiously, with care.","Hugability is warming up.","Hug might be okay, maybe.","Hug attempts becoming friendly.","Hug at your discretion.","Hug cautiously, might enjoy it.","Hug chance is promising.","Slightly squeezable – like a cactus.","Hug attempts likely to succeed.","Hug cautiously – comfort guaranteed.","Hug potential increasing.","Hug probability getting high.","Hug may brighten your day.","Hug cautiously, you might like it.","Hug attempts encouraged.","Hugging becoming enjoyable.","Hug threshold nearly halfway!","Neutral – could go either way.","Hug probability slightly above average.","Hug cautiously – feeling is mutual.","Hug success likely.","Hug may improve your day.","Hug at your own risk… of happiness.","Hug gently, it’s welcome.","Hugability increasing steadily.","Hug attempts encouraged and tolerated.","Hug potential is strong.","Kinda huggy – proceed with optimism.","Hug attempts will likely succeed.","Hug gently, people might like it.","Hug chance is very good.","Hug cautiously, results: happy.","Hugging is safe and pleasant.","Hug attempts generally welcome.","Hug success almost guaranteed.","Hug potential very high.","Hug – it’s okay to be excited.","Warm and soft – hugs likely to improve your day.","Hugging will probably make someone happy.","Hug attempts encouraged with joy.","Hug freely, positive vibes expected.","Hugging is likely a good idea.","Hug success is practically certain.","Hug enthusiastically.","Hugging will bring smiles.","Hugging recommended.","Hug potential extremely high.","Hug at will, joy guaranteed.","Hugging will likely brighten your day.","Hug freely and warmly.","Hug success is almost inevitable.","Hug enthusiastically – happiness incoming.","Hugging is strongly recommended.","Hug magnet in training.","Hugging will spread joy.","Hug enthusiastically – people love it.","Hugging is basically irresistible.","Hug at full potential.","Hug freely – happiness guaranteed.","Hug enthusiastically, maybe twice.","Hug attempts are joyous events.","Hugging is a delight.","Hug enthusiastically – extreme joy likely.","Hug magnet – everyone wants a piece.","Hug freely, you are loved.","Huggy? – certified cuddle legend, handle with love!"
        ];

    // Clamp score between 0 and 100
    score = Math.max(1, Math.min(100, score));
    
    // Round to nearest integer and allow +/-1 variation
    const minIndex = Math.max(0, Math.floor(score) - 1);
    const maxIndex = Math.min(100, Math.ceil(score) + 1);

    // Pick a random index between minIndex and maxIndex (inclusive)
    const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    return huggabilityComments[randomIndex];

}

function getScore(name) {

    if (name.toLowerCase().indexOf("ben") >= 0) { return [0, `Good luck hugging ${name} with Ben in it...`]; }
    if (name.toLowerCase().indexOf("conan") >= 0) { return [100, "Conan is always huggable"]; }

    let lengthFactor = 1 - ((Math.max(name.length, 2) - 2) / 6);
    if (lengthFactor <= 0) lengthFactor = 0; 
    let familiarFactor = getFamiliarFactor(name);


    let softnessFactor = softness(name)

    let score = (
        0.3 * lengthFactor +
        0.5 * softnessFactor +
        0.2 * familiarFactor
    )
    score = 1 / (1 + Math.exp(-8 * (score - 0.5)))
    score = Math.max(score, 0)
    score = Math.min(score, 1)

    return [score, undefined]
}

function getFamiliarFactor(fullName) {
    const allNames = [
        { name: "amelia", count: 5054 }, { name: "olivia", count: 4938 }, { name: "lily", count: 4761 }, { name: "jessica", count: 3984 }, { name: "emily", count: 3974 }, { name: "sophie", count: 3923 }, { name: "ruby", count: 3702 }, { name: "grace", count: 3691 }, { name: "ava", count: 3621 }, { name: "isabella", count: 3464 }, { name: "evie", count: 3385 }, { name: "chloe", count: 3347 }, { name: "mia", count: 3346 }, { name: "poppy", count: 2932 }, { name: "isla", count: 2849 }, { name: "ella", count: 2783 }, { name: "isabelle", count: 2719 }, { name: "sophia", count: 2661 }, { name: "freya", count: 2619 }, { name: "daisy", count: 2458 }, { name: "charlotte", count: 2390 }, { name: "maisie", count: 2230 }, { name: "lucy", count: 2228 }, { name: "phoebe", count: 2008 }, { name: "scarlett", count: 1987 }, { name: "holly", count: 1971 }, { name: "lilly", count: 1950 }, { name: "ellie", count: 1893 }, { name: "megan", count: 1799 }, { name: "layla", count: 1780 }, { name: "lola", count: 1777 }, { name: "imogen", count: 1773 }, { name: "eva", count: 1714 }, { name: "summer", count: 1711 }, { name: "millie", count: 1641 }, { name: "sienna", count: 1585 }, { name: "alice", count: 1554 }, { name: "abigail", count: 1493 }, { name: "erin", count: 1491 }, { name: "lacey", count: 1475 }, { name: "hannah", count: 1462 }, { name: "jasmine", count: 1429 }, { name: "florence", count: 1406 }, { name: "elizabeth", count: 1396 }, { name: "lexi", count: 1324 }, { name: "molly", count: 1322 }, { name: "sofia", count: 1249 }, { name: "matilda", count: 1225 }, { name: "emma", count: 1221 }, { name: "brooke", count: 1216 }, { name: "amy", count: 1213 }, { name: "amber", count: 1201 }, { name: "gracie", count: 1162 }, { name: "amelie", count: 1128 }, { name: "rosie", count: 1124 }, { name: "leah", count: 1120 }, { name: "katie", count: 1105 }, { name: "maya", count: 1072 }, { name: "eleanor", count: 1049 }, { name: "georgia", count: 1022 }, { name: "emilia", count: 1007 }, { name: "eliza", count: 955 }, { name: "faith", count: 914 }, { name: "bethany", count: 913 }, { name: "evelyn", count: 871 }, { name: "isabel", count: 857 }, { name: "anna", count: 827 }, { name: "hollie", count: 825 }, { name: "bella", count: 823 }, { name: "paige", count: 811 }, { name: "harriet", count: 809 }, { name: "esme", count: 797 }, { name: "zara", count: 790 }, { name: "lexie", count: 788 }, { name: "willow", count: 772 }, { name: "rose", count: 764 }, { name: "madison", count: 760 }, { name: "julia", count: 759 }, { name: "annabelle", count: 758 }, { name: "isobel", count: 754 }, { name: "niamh", count: 733 }, { name: "maddison", count: 731 }, { name: "martha", count: 723 }, { name: "skye", count: 717 }, { name: "lauren", count: 710 }, { name: "caitlin", count: 708 }, { name: "elsie", count: 699 }, { name: "keira", count: 693 }, { name: "rebecca", count: 693 }, { name: "sarah", count: 663 }, { name: "heidi", count: 652 }, { name: "zoe", count: 649 }, { name: "maria", count: 628 }, { name: "maryam", count: 616 }, { name: "aisha", count: 613 }, { name: "tia", count: 613 }, { name: "nicole", count: 605 }, { name: "kayla", count: 604 }, { name: "francesca", count: 602 }, { name: "lydia", count: 589 }, { name: "harry", count: 7523 }, { name: "oliver", count: 7007 }, { name: "jack", count: 6844 }, { name: "alfie", count: 5524 }, { name: "charlie", count: 5516 }, { name: "thomas", count: 5353 }, { name: "jacob", count: 5047 }, { name: "james", count: 4945 }, { name: "joshua", count: 4786 }, { name: "william", count: 4632 }, { name: "ethan", count: 4581 }, { name: "george", count: 4347 }, { name: "riley", count: 4226 }, { name: "daniel", count: 3928 }, { name: "samuel", count: 3803 }, { name: "noah", count: 3287 }, { name: "oscar", count: 3251 }, { name: "joseph", count: 3089 }, { name: "mohammed", count: 3054 }, { name: "max", count: 3043 }, { name: "dylan", count: 2962 }, { name: "muhammad", count: 2854 }, { name: "alexander", count: 2819 }, { name: "archie", count: 2805 }, { name: "benjamin", count: 2789 }, { name: "lucas", count: 2716 }, { name: "leo", count: 2664 }, { name: "henry", count: 2625 }, { name: "jake", count: 2619 }, { name: "logan", count: 2549 }, { name: "tyler", count: 2520 }, { name: "jayden", count: 2353 }, { name: "isaac", count: 2352 }, { name: "finley", count: 2245 }, { name: "mason", count: 2171 }, { name: "ryan", count: 2151 }, { name: "harrison", count: 2122 }, { name: "adam", count: 2062 }, { name: "lewis", count: 2035 }, { name: "edward", count: 1935 }, { name: "luke", count: 1830 }, { name: "freddie", count: 1819 }, { name: "matthew", count: 1743 }, { name: "liam", count: 1690 }, { name: "zachary", count: 1664 }, { name: "callum", count: 1580 }, { name: "sebastian", count: 1493 }, { name: "connor", count: 1471 }, { name: "jamie", count: 1445 }, { name: "theo", count: 1407 }, { name: "toby", count: 1389 }, { name: "harvey", count: 1388 }, { name: "michael", count: 1364 }, { name: "nathan", count: 1319 }, { name: "harley", count: 1308 }, { name: "kai", count: 1211 }, { name: "david", count: 1163 }, { name: "aaron", count: 1147 }, { name: "alex", count: 1129 }, { name: "charles", count: 1090 }, { name: "aiden", count: 1077 }, { name: "leon", count: 1069 }, { name: "mohammad", count: 1037 }, { name: "luca", count: 982 }, { name: "tommy", count: 980 }, { name: "finlay", count: 967 }, { name: "jenson", count: 966 }, { name: "arthur", count: 961 }, { name: "louis", count: 961 }, { name: "rhys", count: 946 }, { name: "owen", count: 943 }, { name: "reuben", count: 941 }, { name: "ollie", count: 933 }, { name: "louie", count: 887 }, { name: "gabriel", count: 874 }, { name: "bobby", count: 869 }, { name: "cameron", count: 848 }, { name: "dexter", count: 833 }, { name: "blake", count: 831 }, { name: "stanley", count: 824 }, { name: "kian", count: 800 }, { name: "evan", count: 770 }, { name: "jude", count: 764 }, { name: "frankie", count: 756 }, { name: "elliot", count: 755 }, { name: "hayden", count: 747 }, { name: "ashton", count: 727 }, { name: "joel", count: 712 }, { name: "caleb", count: 709 }, { name: "bailey", count: 704 }, { name: "elijah", count: 701 }, { name: "taylor", count: 696 }, { name: "robert", count: 694 }, { name: "kayden", count: 686 }, { name: "kyle", count: 683 }, { name: "frederick", count: 669 }, { name: "ben", count: 667 }, { name: "reece", count: 656 }, { name: "jackson", count: 647 }, { name: "john", count: 645 }
        ];
    const cleanParts = fullName.trim().toLowerCase().split(/\s+/); // split by spaces
    let totalFactor = 0;

    for (let part of cleanParts) {
        const entry = allNames.find(e => e.name === part);
        if (entry) {
            totalFactor += (entry.count / 7523);
        }
    }

    // Average over the number of name parts to keep it 0-100-ish
    return cleanParts.length > 0 ? totalFactor / cleanParts.length : 0;
}


function softness(word) {
    word = word.toLowerCase();

    // Map special phonetics to English letters

    // Common soft consonant clusters
    const softClusters = ['sl','bl','gl','pl','fl','tr','br','dr','cl','fl','gr','pr','wr'];

    // Common hard consonant clusters
    const hardClusters = ['cr','tr','dr','str','spr','spl','sk','sc','sp','st','cl','kr'];

    // Single consonants
    const softConsonants = ['m','n','l','w','y','v','z','d', 'm'];
    const hardConsonants = ['p','k','s','f','b','g','c','r'];

    let softScore = 0;
    let hardScore = 0;



    for (let cluster of hardClusters) {
        if (word.includes(cluster)) {
            hardScore += 2;
            word = word.replace(cluster, '');
        }
    }

    for (let cluster of softClusters) {
        if (word.includes(cluster)) {
            softScore += 2; // clusters are weighted more than single letters
            word = word.replace(cluster, ''); // remove so letters aren't double-counted
        }
    }



    for (let char of word) {
        if ('aeiou'.includes(char)) continue;

        if (softConsonants.includes(char)) {
            softScore += 1;
        } else if (hardConsonants.includes(char)) {
            hardScore += 1;
        }
    }

    const total = softScore + hardScore;
    if (total === 0) return 0.5; // neutral if nothing matched

    return softScore / total;
}



    
const needle = document.getElementById("needle");

let currentValue = 50;   // where the needle is now (0–100)
let animationId = null;

function valueToAngle(value) {
// map 0–100 → -90° to +90°
return -90 + (value * 180 / 100);
}

function animateNeedleTo(targetValue, duration = 800) {
cancelAnimationFrame(animationId);

const startValue = currentValue;
const startTime = performance.now();

function animate(time) {


    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1); // 0 → 1

    // ease-in-out (smooth)
    const eased = t * t * (3 - 2 * t);

    currentValue = startValue + (targetValue - startValue) * eased;

    const angle = valueToAngle(currentValue);

    needle.style.transform = `rotate(${angle}deg)`;

    if (t < 1) {
    animationId = requestAnimationFrame(animate);
    }
}

animationId = requestAnimationFrame(animate);
}

