## 2. Create a notification

[CALLOUT rhel/platform-logos/chef-analytics.svg,networks/workstation.png] Connect to the Chef Analytics web interface from your workstation.

Now you're ready to create a notification. From the Chef Analytics home page, click on **Notifications**. Then click **+** and then **E-mail**.

![Adding an email notification](chef-analytics/add-email-notification.png)

Click the title, `New Email 1`, and rename it to `send_email`. Then fill in the form fields with values that make sense for your company. If your SMTP server requires authentication, enter the username and password as well. Then click **Save**.

[TIP] If you installed a mail server on your Chef Analytics system, set the **Hostname** field to `localhost` and leave **Username** and **Password** blank.

![The completed email notification setup form](chef-analytics/add-email-notification-form.png)

We’re now ready to write a rule to use this notification.
