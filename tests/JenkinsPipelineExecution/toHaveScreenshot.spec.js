const { test, expect } = require('@playwright/test');
//declare test case name
test('visual comparion in playwright',async({page})=>{
// Navigate the browser to the target test page URL.
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

  const form=await page.locator('nb-card',{hasText:'Using the Grid'})
  
await form.getByRole('radio',{name:'Option 1'}).check({force:true})
//write test step for comparion 
await expect(form).toHaveScreenshot();
await page.close();

});

