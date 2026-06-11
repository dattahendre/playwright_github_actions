const{test,expect=require('@faker-js/faker').expect}=require('@playwright/test');

test.skip('Handle dialog test case',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Alerts.html');
    page.on('dialog',async(dialog)=>{
        //write assertion to handle alert
        expect(dialog.type()).toBe('alert');
        //validate the alert message
        expect(dialog.message()).toBe('I am an alert box!');
        //accept the alert
        await dialog.accept();

        //click on alert with ok and cancel button
        await page.click("//a[contains(text(),'Alert with OK & Cancel')]");
    })
    //click on alert button to trigger alert
    await page.click("//button[contains(text(),'click the button to display an')]");
    }); 

    test.skip('Handle confirmation test case',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Alerts.html');
    page.on('dialog',async(dialog)=>{
        //write assertion to handle alert
        expect(dialog.type()).toBe('confirm');
        //validate the alert message
        expect(dialog.message()).toBe('Press a Button !');
        //accept the alert
        await dialog.dismiss();

        //click on alert with ok and cancel button
        await page.click("//a[contains(text(),'Alert with OK & Cancel')]");
    })
    //click on alert with ok & cancel button to trigger confirmation alert
    await page.getByRole('link', { name: 'Alert with OK & Cancel' }).click();
       //click on alert button to trigger alert
    await page.getByRole('button', { name: 'click the button to display a confirm box' }).click();
    }); 

    test('Handle prompt test case',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Alerts.html');
    page.on('dialog',async(dialog)=>{
        //write assertion to handle alert
        expect(dialog.type()).toBe('prompt');
        //validate the alert message
        expect(dialog.message()).toBe('Automation Testing user');
        //accept the alert
        await dialog.dismiss();

        
    })
    //click on alert with ok & cancel button to trigger confirmation alert
    await page.getByRole('link', { name: 'Alert with Textbox ' }).click();
       //click on alert button to trigger alert
    await page.getByRole('button', { name: 'click the button to demonstrate the prompt box ' }).click();
    }); 