##Adopting Chef

As in most companies, the IBM event team includes people with a variety of backgrounds. Some people are new to source control or new to Git. Some have development backgrounds, while others have operations backgrounds.
Rich remarked on how the first step is rethinking how you approach a problem. "You have to change your mindset. Historically, our team would fix problems manually on individual nodes. Okay, but the next time you rebuild that node it's going to have the same problem if you don't fix the source of it.

"Just this morning, with Jenkins, we did something manually weeks ago and now we can't remember why we changed it or how we fixed it. You've got to get to that mindset where you have to change the code first. That's definitely the first hurdle to get over."

To bring everyone up to speed, the team uses Chef to bootstrap a workstation setup, some Chef training, whether in person or through [Learn Chef](https://learn.chef.io/), individual mentoring, and code reviews.

###Setting up the workstation

To ensure that everyone's workstation looks the same, the team has a standard way of setting up the Chef development environment. Team members go to a wiki page that gives them a single command to run. That command downloads Chef and then Chef itself sets up the workstation. Brian says, "There are also some links to the online Chef training, which we encourage people to go through. We also have some links to some Ruby primers. Because not everyone is familiar with Git, the team has its own helper gems. For example, team members can update all the cookbooks with a single command."

###Achieving reliability

The event team uses a combination of testing, code reviews, and personal engagement to create reliable cookbooks that conform to a set of standards. Here is the process.

![](skills/continuous-availability-at-ibm/reliability_cycle.png)

Brian explains, "We expect people to create feature branches. We expect them to write integration tests. We prefer that people write their tests first, although we can't really enforce that. Do your red/green development. Write your [ServerSpec](http://serverspec.org/) test and then write your feature to make that test pass.  

"Before you submit something, we provide tooling so that when you test a cookbook locally, it's tested the same way as in the pipeline, so you'll know ahead of time if the cookbook's going to pass or not.

"Assuming that it passes, you submit your merge request, GitLab tells Jenkins to run static analysis tests and integration tests, and notifies people that there's a merge request waiting. Either the merge is approved or it's not. If it's not, we ask ourselves if the issue impacts our standards. If it does, we create a story and add it to our static analysis. If it's approved, the change can be merged and the person is notified. Jenkins will then send the updated cookbook to the Chef server. It's up to the person to promote the change through UCD and push it out."

Here is a more fine-grained view of the development process.


![](skills/continuous-availability-at-ibm/dev_process.png)

Rich commented on the time it takes to get used to the team's approach to testing. "Testing, putting all that effort into writing all those test cases, can be hard. There's a lot of test cases to write. Sometimes there's more test code than the cookbook itself. That's another one of the hurdles to get over.

"The testing is worth it. Part of our infrastructure hasn't been ported to Linux and Chef, yet. I keep seeing people re-doing things because they're doing it manually. I keep saying, I can't wait until that's on Chef so we're not doing that."

###Code reviews

Code reviews are important to the team. They help people learn how to write cookbooks, and they provide a good forum for giving feedback. In fact, the team moved to GitLab because it makes the code review process easier.

Brian says, "We try to have a very tight loop in the code review process. If we see something, and we think it should be done in a certain way, we open a story to write a [Foodcritic](https://docs.chef.io/foodcritic.html) rule to get it in our development environment. We have, probably, 15 or 17 Foodcritic rules to enforce our various standards. For example, we need to examine the readme to make sure attributes are documented.

"We're also in the process of adding [RuboCop](http://batsov.com/rubocop/) to our pipeline, as well. What's nice about RuboCop is that, for standards that are debatable, it's nice to have an authoritative source that isn't someone on the team. When you're saying, "No, it's two spaces, not tabs" you can point to the rules in RuboCop and say, "We're going to go with that."
