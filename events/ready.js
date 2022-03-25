const activities = [
    "with the .help command.",
    "with the developers console.",
    "with some code.",
    "with JavaScript."
  ];
  

module.exports = {
    name: "ready",
    run: async (bot) => {
        setInterval(async () => {
            // generate random number between 1 and list length.
            const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
            const newActivity = activities[randomIndex];
            
        
            bot.client.user.setPresence({ activities: [{ name: newActivity, type: 'PLAYING' }], status: "dnd" })
          }, 10000);
        
        
        console.log("Logged in as " + bot.client.user.tag)
    }
}