const puppeteer = require('puppeteer')

const codeObj = require('./code')
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'tekito2752@bsomek.com'
const password = 'demo9876'

let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[placeholder='Your username or email']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let loginButtonClicked = page.click("button[type='button']", { delay: 50 })
    return loginButtonClicked
}).then(function () {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function () {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmUp
}).then(function () {
    let waitforThreeSec = { delay: 50 }
    return waitforThreeSec
}).then(function () {
    let allProblemChallenge = page.$$('.challenge-submit-btn button', { delay: 50 })
    return allProblemChallenge
}).then(function (questionsArr) {
    console.log('Number of questions', questionsArr.length)
    let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answer[0])
    return questionWillBeSolved
})


function waitAndClick(selector, currPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = currPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModel = currPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function () {
            let editorInFocusPromise = waitAndClick('.hr-monaco-editor-parent', page)
            return editorInFocusPromise
        }).then(function () {
            return waitAndClick('input[type="checkbox"]', page)
        }).then(function () {
            return page.waitForSelector('.ui-tooltip-wrapper textarea', page)
        }).then(function () {
            return page.type('.ui-tooltip-wrapper textarea', answer, { delay: 20 })
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 })
            return AisPressed
        }).then(function () {
            let XisPressed = page.keyboard.press('X', { delay: 50 })
            return XisPressed
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function () {
            let mainEditorInfocus = waitAndClick('.hr-monaco-editor-parent', page)
            return mainEditorInfocus
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 })
            return AisPressed
        }).then(function () {
            let VisPressed = page.keyboard.press('V', { delay: 20 })
            return VisPressed
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function () {
            return page.click("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']", { delay: 50 })
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}
