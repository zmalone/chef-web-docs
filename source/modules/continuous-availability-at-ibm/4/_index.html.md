##Choosing Chef

The events team has used automation, in some form or another, since its inception. Brian says,  "Our team was formed in preparation for the 1998 games in Nagano. We also delivered the 2000 games in Sydney. So, we've been around for a long time, delivering these sporting events.

"We have built, over time, a lot of automation, such as perl scripts, to do our jobs, but there were problems.  Some scripts were run in one place, to bring up one piece of the infrastructure, and other scripts were run in another place to bring up a different part of the infrastructure."

Rich talked about his own experiences. "I automated a lot of our infrastructure in a home-grown, shell script framework over 10 years ago, using templates. I would try not to change nodes. I would try to change the code first. Obviously, the frameworks that are available now are much more sophisticated and it's much easier to get other folks involved. That was lacking in what we were doing before. I'd have to maintain the scripts because it was hard to share them.

"Another significant feature that was lacking was testing. I couldn't test anything we were changing beforehand other than to try it on a test node. This whole change to a formalized testing methodology is relatively new for me, but I definitely see the value."

Brian was first introduced to Chef in 2013. "We got into configuration management, I don't want to say accidently, but I was at an IBM conference, and there was an IBM product team talking about IBM Cloud Orchestrator and how they had added some Chef integration to it. They seemed really excited about it, so I thought I should figure out what Chef is. I started learning about Chef and we also had a Chef consultant work with us for a few days.

"For us, what we mean when we talk about DevOps is that we want our customers to be able to deploy things at their own pace, and we want to help them meet their business drivers. That's our interpretation of it. It's strongly on the deployment side. (Customers are internal IBM development teams.)

"My view is, to get us there, we need a very strong and stable infrastructure. To achieve that, we need a fully automated build-and-converge system like Chef that can verify that everything is in place the way it should be, so we don't shift our time from doing deployments ourselves to chasing down why a customer deployment failed. That's why we didn't just take a deployment tool and put it in place. We brought everything under configuration management and made it convergent, so we have confidence that, yes, the customer deployment is going to work because everything is the way it should be. We don't do changes manually. That can cause drift across our nodes." 
