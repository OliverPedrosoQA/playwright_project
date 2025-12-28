import { test, expect } from '@playwright/test';
import { promises } from 'timers';

test.describe('Client App Tests', () => {
    test('1- Login to client app successfully', async ({page}) => {
        const emailField = page.getByRole('textbox', { name: 'email@example.com' });
        const passwordField = page.getByRole('textbox', { name: 'enter your passsword' });
        const loginButton =  page.getByRole('button', { name: 'Login' });
        const homePageMenuHeader = page.getByText('AutomationAutomation Practice HOME ORDERS Cart Sign Out');

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await emailField.fill('oliver1508@hotmail.com');
        await passwordField.fill('Test123!');
        await loginButton.click();

        await expect(homePageMenuHeader).toBeVisible();
    });

    test('2- Login test with css selector', async ({page}) => {
        const userEmail = page.locator('#userEmail');
        const userPassword = page.locator('#userPassword');
        const loginButton = page.locator('#login');
        const logoHolder = page.locator('.logo');

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        await userEmail.fill('oliver1508@hotmail.com');
        await userPassword.fill('Test123!');
        await loginButton.click();  

        await page.waitForLoadState('networkidle'); // **it might be flaky** It waits for network to be idle and then find the elements

        await expect(logoHolder).toBeVisible();
    });

    test('3- Login and wait for similar elements to load', async ({page}) => {
        const userEmail = page.locator('#userEmail');
        const userPassword = page.locator('#userPassword');
        const loginButton = page.locator('#login');
        const productCards = page.locator('.card-body');

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        await userEmail.fill('oliver1508@hotmail.com');
        await userPassword.fill('Test123!');
        await loginButton.click();  

       await productCards.first().waitFor(); // Waiting for similar elements to load

        const listProductsCards = await productCards.allTextContents(); // lists all the text contents from similar elements
        console.log(listProductsCards);

    });

    test('4- Login to Practise Automation site - Checkboxes and Radio Buttons', async ({page}) => {
        const userNameTextField = page.getByRole('textbox', { name: 'Username:' });
        const passwordTextField = page.getByRole('textbox', { name: 'Password:' });
        const signInButton = page.getByRole('button', { name: 'Sign In' });
        const okayButton = page.getByRole('button', { name: 'Okay' });
        const comboBoxRoles = page.getByRole('combobox');
        const userRadioButton = page.locator('.customradio').last();
        const menuBar = page.getByText('ProtoCommerce Home Shop');

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await userNameTextField.fill('rahulshettyacademy');
        await passwordTextField.fill('learning');
        await comboBoxRoles.selectOption('consult');
        await userRadioButton.click();
        await okayButton.click();
        
        await signInButton.click();

        await expect(menuBar).toBeVisible();

    })

    test('5- Validate Blinking Text', async ({page}) => {
        const blinkingToasMessage = page.getByRole('link', { name: 'Free Access to InterviewQues/' });

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await expect(blinkingToasMessage).toHaveAttribute('class', 'blinkingText');

    })
    
    test('6- Validating checkboxes and radio buttons', async ({page}) => {
        const userRadioButton = page.locator('.customradio').last();
        const termsAndConditionsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and'});

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
      
        await expect(userRadioButton).toBeChecked(); //valida se está checado
        await expect(termsAndConditionsCheckbox).toBeChecked(); //valida se está checado
        console.log(await termsAndConditionsCheckbox.isChecked()); //returns true or false

    })

    test('7- Validating child window handling', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const blinkingToasMessage = page.getByRole('link', { name: 'Free Access to InterviewQues/' });

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        // there are 3 possible statuses for a Promise: fulfilled, rejected, pending
        // fulfilled -> when the promise is resolved
        // rejected -> when the promise is rejected
        // pending -> when the promise is still in progress, and all actions inside the array need to be finished before moving on
       const [newPage] = await Promise.all([
                context.waitForEvent('page'), // listens for new page opened
                await blinkingToasMessage.click(), //new page is opened
            ]);
       
        const newPageHeader = await newPage.getByRole('heading', { name: 'Documents request' }); //after new page is opened, we can access its elements
        await expect(newPageHeader).toBeVisible();
    })

    test.only('8- Getting email from new page', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const blinkingToasMessage = page.getByRole('link', { name: 'Free Access to InterviewQues/' });
        const userNameTextField = page.getByRole('textbox', { name: 'Username:' });

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        // there are 3 possible statuses for a Promise: fulfilled, rejected, pending
        // fulfilled -> when the promise is resolved
        // rejected -> when the promise is rejected
        // pending -> when the promise is still in progress, and all actions inside the array need to be finished before moving on
       const [newPage] = await Promise.all([
                context.waitForEvent('page'), // listens for new page opened
                await blinkingToasMessage.click(), //new page is opened
            ]);
       
        const newPageHeader = await newPage.getByRole('heading', { name: 'Documents request' }); //after new page is opened, we can access its elements
        await expect(newPageHeader).toBeVisible();
        
        // Get the email text from the new page
        const text = await newPage.locator('.red').textContent();
        console.log("full text: " + text); 
        const splitText = text?.split("@");
        const email = splitText?.[1].split(" ")[0];
        console.log("extracted email: " +  email);
        

        await userNameTextField.fill(email!); //filling the email extracted from the new page into the username field
        console.log("user email input: ", await userNameTextField.inputValue());
    });

})