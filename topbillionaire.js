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
        await page.goto("https://www.google.com/");
        await page.type("input[title='Search']","bloomberg billionaires index ",{delay : 200 })
        await page.keyboard.press('Enter',{delay : 1000 });
        await page.waitFor(2000);
        await page.click(".LC20lb.DKV0Md",{delay : 2000 });
        await page.waitFor(2000);
        await page.waitForSelector(".table-row",{delay : 3000 });
        let someList = await page.$$(".table-cell.t-name");
        let someList2 = await page.$$(".table-cell.active.t-nw");
        
           let value= [];
           let value1 = [];
           let html = '<html> <head><title>Top 10 Billionaire</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Todays Top 10 Billionaire </h1><ul>';

           for (let i = 1; i < 11; i++){
               value[i-1] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
            value1[i-1] = await page.evaluate(
                function (element) { return element.textContent }, someList2[i]);
                html += "<li>";
                html+= value[i-1];
                html+= " Net Worth";
                html+= value1[i-1];
                html += "</li>";
           }         
              html += '</div><h4>Source-Bloomberg billionaires index </h4></body></html></ul>';
              fs.writeFileSync("billionaire.html",html);
              
    } catch (err){
        console.log("Error: " + err);
    }
})();