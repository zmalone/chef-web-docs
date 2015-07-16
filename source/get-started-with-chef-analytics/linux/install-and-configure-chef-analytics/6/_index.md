## 6. Sign in to Analytics server

From your web browser, navigate to the URL for your Chef Analytics server. Click the **Start Analytics** button and you'll be temporarily redirected to your Chef server logon page.

![The Chef Analytics sign-in page](chef-analytics/sign-in.png)

Sign in with the administrator user name and password that you used when you set up your Chef server.

![The Chef Manage sign-in page](chef-analytics/sign-in-redirect.png)

Click **Yes** to authorize Chef Analytics to use your Chef account.

![Authorize Chef Analytics to use your Chef account](chef-analytics/authorize.png)

On the home page you'll see an event timeline. This timeline is a rolling list of events that are happening in your infrastructure &ndash; machines that are checking in to Chef server, users updating cookbooks, and so on.

![The Chef Analytics home page](chef-analytics/home-page.png)

In the next step, you'll run `chef-client` on your node and watch an event appear on the timeline.
