let pptr = require("puppeteer");
let fs=require("fs");
let browserstartpromise = pptr.launch({
    headless : true,
    defaultViewport : null,
    args : [ "--start-maximized" , "--disable-notifications" ]
});

(async function () {
    try{
        let browserobj = await browserstartpromise;
        let page = await browserobj.newPage();
        await page.goto("https://www.worldometers.info/coronavirus/");
        await page.waitForSelector("#maincounter-wrap");
        let someList = await page.$$("#maincounter-wrap");
        
        
           let value= [];
           let html = '<html> <head><title>Update on Pandemic</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Corona Update </h1><ul>';

           for (let i = 0; i < 3; i++){
               value[i] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
                html += "<li>";
                html+= value[i];
                html += "</li>";
           }         
              html += '</div><h4>Source- Worldometers/coronavirus</h4></body></html></ul>';
              fs.writeFileSync("coronav.html",html);

    } catch (err){
        console.log("Error: " + err);
    }
})();