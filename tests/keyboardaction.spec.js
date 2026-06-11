const{test,expect}=require('@playwright/test');
//writing test case name
test('Keyboard action test case',async({page})=>{
    //navigate to the google.com
    await page.goto('https://www.google.com/');
    //type text in search box
    await page.locator("textarea[name='q']").type('Mukesh otwani');
  //selct all text using control A
    
    await page.keyboard.press('Control+A');
   await page.waitForTimeout(1000);
   //copy the teext using control C
    await page.keyboard.press('Control+C');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+Delete');
    
    
//close the browser    
//await page.close();
    
});