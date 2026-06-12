const{test,expect}=require('@playwright/test');
//enter tc name
test('Handle frame test case',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html');

    
    //check how many frame in web page first frame
    const allframe=await page.frames();
    //print total frames in web page
    console.log("Total frames in web page:",allframe.length);
    //1 st approch to handle frame object there are 2 ways to handle frame 1st by using name or id and 2nd by using url
    //switch to first frame by using frame object by name or id
    const frame1=page.frame({name:'SingleFrame'});
    //enter the text in first frame
    await frame1.locator("input[type='text']").fill('Welcome to Playwright');
    //click on 2nd frame button using xpath //a[contains(text(),'Iframe with in an Iframe')]
    await page.locator("//a[contains(text(),'Iframe with in an Iframe')]").click();
    //switch to 2nd frame by using frame object by frame locator
const frame2=page.frame({url:'https://demo.automationtesting.in/SingleFrame.html'});
    //enter the text in 2nd frame
    console.log("Switching to second frame and entering text...",+frame2);

});