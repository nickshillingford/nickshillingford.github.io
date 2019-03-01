**Week 1 – data**

On the day of the game, I prepared my script using the node tweet stream NPM module, which makes it easy to interface with the public streaming API and to track keywords. The module implements a back off strategy to prevent going over the rate limit and losing access to the API.

Since all I cared about were the commercials, I decided to track the keywords “super bowl” and “commercial”. I was worried that this wouldn’t be enough and that I would miss lots of data. I had only one shot during the 4 hour window. Fortunately, it was enough and I ended up with more data than I needed. 30 minutes before game time at six o’clock, I ran my script and sat back for the next 4 hours, watching the data come in. The API returns tweet objects as JSON so I set up the script to retrieve the objects as they came in, turn them into strings with JSON Stringify, then write them to txt files using the node file system module. By 10 o’clock, I had 4 GBs of text data among 4 files, organized by hour from 6pm-10pm.

I wrote another script to break each file up into smaller files. Each one was so large it was having trouble opening in text editors. I decided to ignore retweets, imbedded quotes, and @replies when parsing. With them I would end up presenting inaccurate results in the visualization. Since I was keeping track of which brands and people were mentioned most often, I’d be counting mentions from the same tweet multiple times, which I decided wouldn’t count as a new mention. After analysis, I put all the results into one large JSON object for each hour so they could be accessed easier with JavaScript.


*an example of JSON tweet objects returned by twitter servers*

![tweet](https://firebasestorage.googleapis.com/v0/b/web-demo-2188e.appspot.com/o/pic_1.png?alt=media&token=3b649a57-1e7d-4b65-b2bc-679971cc9e30) 


**Week 2 – design**

I knew from the start that I wanted the visualization to be an analysis of the tweets minute by minute. I played with a couple of designs, one being a circular clock. The user would scroll to move the clock hands but ultimately this design ended up not fitting. One thing I’ve learned is to not get too excited about an idea because sometimes a design you think will be cool, ends up not being that cool or just doesn’t translate that well from concept to code. I wanted the experience to tell a story, and realized the best way to do that was with the scroll format, using a library called Scrollama and the capabilities provided by D3.

I didn’t want the user to be pressing buttons all the time, or at all if I could help it. I wanted them to scroll through the entire thing to get the full story without pressing a single button. I would allow them to explore the data further if they wanted to by placing the mouse over any of the data points to reveal more, but it wouldn't be forced. I was also worried that a normal bar or line graph would be too boring but D3 provides so much flexibility that you can make any visualization interesting if you really want to. For the graph, I decided to measure each minute by average number of tweets per second instead of total number of tweets in that minute to show how much data Twitter generates every second.


*first design sketches*

![sketch](https://firebasestorage.googleapis.com/v0/b/web-demo-2188e.appspot.com/o/pic2.png?alt=media&token=08c77d91-6961-45f3-a30b-99a204cf7c03)


**Week 3 – code**

The only issue encountered here was displaying the top 3 mentions when the user placed their mouse over a data point. Initially, I had planned to use D3 force layouts to represent each mention as colored circles packed together. Because each SVG element is its own node in the DOM tree, this ended up being problematic for minutes with high numbers of mentions.

For example, at 6:54 PM when the Doritos commercial aired, there were over 1000 circles packed into one div, each using collision detection. It worked, but after about 10 seconds, my MacBook sounded like a spaceship about to blast off. I wasn’t satisfied with this performance and unfortunately could not see any way around it, as this is just the nature of SVG. I decided to use Chart.js instead to populate the div with polar area charts. The rest went smoothly thanks to JavaScript and D3.

Overall I’m quite happy with how the project turned out.
