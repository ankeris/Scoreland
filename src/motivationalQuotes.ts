export default new class Motivation {
    private quotesArr;
	constructor() {
		this.quotesArr = [ '“Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.”',
        "Where there is a will, there is a way. If there is a chance in a million that you can do something, anything, to keep what you want from ending, do it. Pry the door open or, if need be, wedge your foot in that door and keep it open.",
        "Do not wait; the time will never be ‘just right‘.",
        "Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along.",
        "Press forward. Do not stop, do not linger in your journey, but strive for the mark set before you.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Aim for the moon. If you miss, you may hit a star.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Keep your eyes on the stars, and your feet on the ground.",
        "We aim above the mark to hit the mark.",
        "One way to keep momentum going is to have constantly greater goals.",
        "Change your life today. Don’t gamble on the future, act now, without delay.",
        "You just can’t beat the person who never gives up.",
        "Start where you are. Use what you have. Do what you can.",
        "Why should you continue going after your dreams? Because seeing the look on the faces of the people who said you couldn’t… will be priceless.",
        "Never give up, for that is just the place and time that the tide will turn.",
        "The Way Get Started Is To Quit Talking And Begin Doing.",
        "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
        "Don’t Let Yesterday Take Up Too Much Of Today.",
        "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.",
        "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up." ]
	}

	getRandomQuote = (): string => this.quotesArr[Math.floor((Math.random() * this.quotesArr.length))];
}
