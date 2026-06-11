const{test,expect}=require('@playwright/test');

test('Keyboard action test case',async({page})=>{   
    await page.goto('https://www.google.com/');
    await page.locator("textarea[name='q']").type('Mukesh otwani');
    
  await page.waitForSelector("//li[@role='presentation']");
    const suggestions = await page.$$("//li[@role='presentation']");
   
   for(let i=0;i<suggestions.length;i++){
    const text = await suggestions[i].textContent();
    if(text.includes('youtube')){
        await suggestions[i].click();
        break;
    }
}
});