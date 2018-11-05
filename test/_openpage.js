/* eslint-env browser */
async function openPage(browser, testcase, t, port) {
  let address = `http://localhost:${port}/test?test=${testcase}`;

  const page = await browser.newPage();

  const handleClose = async err => {
    t.log(err.message);

    await page.evaluate(() => {
      let final_result = document.createElement("div");
      final_result.id = "final_result";
      document.body.appendChild(final_result);
      return Promise.resolve(document);
    });
  };

  page.on("console", msg => {
    if (String(msg.type) === "error") {
      return handleClose(new Error(msg.text));
    }
  });

  page.on("error", handleClose);
  page.on("pageerror", handleClose);

  await page.goto(address);

  try {
    await page.waitForSelector("#final_result");

    let canvas_dataurl = await page.evaluate(() => {
      let canvas_dataurl = window.canvas_dataurl;
      return Promise.resolve(canvas_dataurl);
    });

    await page.close();

    return canvas_dataurl;
  } catch (err) {
    t.log(err.message);
    await page.close();
    // 800x600 image
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYAQMAAACguBAzAAAABlBMVEX///////9VfPVsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEfUlEQVR4nO3ZvY7jNhSGYQoCVqlGbYqBfBsuhPEtuVSxWKtLmVvSnURBim3VxUAMKzyHpP7oFBKNVO+DHdleUfxo/ZK0MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPh/ZA99KXp9ucQFikFfVsX2uoxayfjUOtyHldvY2eVJl77YXtk4Shvz0VcVVWLX3DXqPhfbK39ko30p7yf5DrdubDcFyntxl7bkz7nYXmVvTrZxpzaTlj5MuW3pqTVn25ZBD5cvttfJHcwvY77b9g4m7zcFvnRZdKZsQ7HdvrRq2dS+swnZdnc0urQJNscX200aNug/+U62sdvd4UIrbYEvtlujf1mvjS1NtDtkjVXrF/bFdpOGnnXrwoXU6/V5F0LMEIodCqm1Kvtnd4r+Lfg63Rf2xXazbTOfWpXdun4RMrelCcX2yuYQ+1ZCynWBcg6pQ7GjIe7tOQ75cC+9CzHHQypXc697vlgXqJZtKUPegRC/9eBC2lWBz6gt+29ePuTDbX2NQ9wZnXUa8pEUojvlqtvn65CzLvWU+gjFdluENC6kC6t+2YSUodihkNrt+UY/aH3fjPGHw4e0GvJ5MMTdVrYheoTrucrEkKtupvWd9QDpMdaj34T1/nPhi+0PabSibYh+neFtIbJdH4XIO3dpX81tSA6pppuWqV2I1j2E02zIpQPjQto6NGunUp/fUUgTrsrhNNoOTGKITTj5XVBPe0prcnfK/iIdGr2hFe35YIjt6/x4EVKFW2N/lyKJIeYpPakopAyV/dlL3yI15DL2L0LsQXAX3V9deJCkhBTSMY1C7Knl7rY/W9lxqSHly2+S9f4J+FOKJIfcfn+8CLHXR6evz3eE2MM+vgpp/MProbUnhsh10r0IqX2H4i0hrlcfh1S+/6VDny4xxHVy45CyfmOI63/GIYXv3cuJnKWGuK5hHJIPi5A+LcR3qOKQ7J0hnYZEt/rtN2lNwq3edxvikNUxSQ1p55DF43c+u5YhRx+/q62XIeE6eUuIS/L9uEVIvRiYZH3uQhbdvaMhi87dfO9ahBzu3PmQuC8c7sI+pDMJfeH/CpmeJ9c3hyyHDtOTcRFyeOjgQ6JB0PSMl2XWpQ2CfEg0nJt6Kz6kNwnDuWXIcmA69bvkhM27tIGpv8qiIXa9eCMHqDcJQ2wNKePJgqkvrCFt2mSBPzejuZWpV1+Z6Sw4PLeim1RRyDw+qbQRaSH+tNlORc0jrdJMp9rhqajM7Wx5Kd2EmV4e85hR/qtys4h9KLbb3dV2d52jzk8PzqNf+a9aV8r04P3Y9OB37URuJzp1HP+rLKTqJnWi8zJN2T5058mHJdsCyZWOZhuK7RYmn7tc9tNTP6w8pYixa29mKrZXMf4m0+jFU0YQ5vL3uC1w+Uen58c/HnOxveYfBFpp6RjtjXLU3Jv+HuGL7XZxbbvpzw15/NNGPrrzzf3ccDv00wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDsXzhQ20XDDQ99AAAAAElFTkSuQmCC";
  }
}

module.exports = openPage;
