
module.exports = class PlayPoker{
    /**
     * Initializes the necessary properties to start a new game.
     */
    startGame() {
        this.bWelcomeMessageShown = true;
        this.nComputerChips = 20;
        this.nPlayerChips = 20;
    }
    
    /**
     * Returns a random number between 1 and 9
     * each representing a Poker Hand
     */
    getRandomHand(){
        return Math.ceil(Math.random() * 9);
    }

    /**
     * This function takes a number as an argument and returns a poker hand
     */
    getPokerHand(nRandomNumber){
        let oHand = {};
        oHand.nNum = nRandomNumber;
        switch(nRandomNumber){
            case 1:
                oHand.sName = "Single pair";
                break;
            case 2:
                oHand.sName = "Two pairs";
                break;
            case 3:
                oHand.sName = "Three of a kind";
                break;
            case 4:
                oHand.sName = "Straight";
                break;
            case 5:
                oHand.sName = "Flush";
                break;
            case 6:
                oHand.sName = "Full house";
                break;
            case 7:
                oHand.sName = "Four of a kind";
                break;
            case 8:
                oHand.sName = "Straight flush";
                break;
            case 9:
                oHand.sName = "Royal flush";
                break;
        }
        return oHand;
    }
    
    /**
     * This function handles each user message and responds 
     * with appropriate message
     * @param {user message} sInput 
     * @param {callback method to send a response} fCallback 
     */
    makeAMove(sInput, fCallback){
        let sReturn = "";

        if(!this.bWelcomeMessageShown){
            fCallback(["Welcome of Farhana's Casino. What is your name?"]);
            this.startGame();
            return;
        }
        else if(!this.sPlayersName){
            this.sPlayersName = sInput;
            sReturn = `Hello ${this.sPlayersName}, very nice to meet you. Do you want to play poker? Answer "YES" or "NO"`;
        }
        else if(sInput.toLowerCase() == "no"){
            sReturn = `Ok ${this.sPlayersName} hope to see you in future. Till then bye`;
        }
        else if(sInput.toLowerCase() == "yes"){
           sReturn = `Great! Lets play poker! The rule is: In each round we both will get a poker hand from the dealer. We both start with 20 chips.
                        
                    Poker hands from highest to lowest rank is: Royal flush>Straight flush>Four of a kind>Full house>Flush>Straight>Three of a kind>Two pair>Single Pair. 
                    In each round I'll let you know what your card is and you can either choose to stay IN or FOLD. 
                    If you choose IN, I will tell you my card and between us whoever gets the higher poker hand wins the round and gets 5 chips from the other person. 
                    If you choose FOLD I get two chips from you. The first person who loses all of their chips would lose the game.
                    
                    `;
           this.oPlayerHand = this.getPokerHand(this.getRandomHand());
           sReturn += `First round: You got "${this.oPlayerHand.sName}". \n\nAre you "IN" or do you want to "FOLD"?`;
        }
        else if(sInput.toLowerCase()=="in"){
            this.oComputerHand = this.getPokerHand(this.getRandomHand());
            sReturn = `I got ${this.oComputerHand.sName}`;
            if(this.oPlayerHand.nNum > this.oComputerHand.nNum){
                sReturn += `\n\nCongratulations! You won. `;
                this.nPlayerChips += 5;
                this.nComputerChips -= 5;
            }
            else if(this.oPlayerHand.nNum == this.oComputerHand.nNum){
                sReturn +=`\n\nThis round is a tie.`;
            }
            else{
                sReturn +=`\n\nI won this round`;
                this.nComputerChips += 5;
                this.nPlayerChips -= 5;
            }
            sReturn += `\nMy current chips count is ${this.nComputerChips} and yours is ${this.nPlayerChips}`;
            if(this.nComputerChips > 0 && this.nPlayerChips >0){
                this.oPlayerHand = this.getPokerHand(this.getRandomHand());
                sReturn += `\nNext round: You got "${this.oPlayerHand.sName}". \n\nAre you "IN" or do you want to "FOLD"?`;
            }   
        }
        else if(sInput.toLowerCase()=="fold"){
            this.nPlayerChips -= 2;
            this.nComputerChips += 2;
            sReturn = `My current chips count is ${this.nComputerChips} and yours is ${this.nPlayerChips}`;
            if(this.nComputerChips > 0 && this.nPlayerChips >0){
                this.oPlayerHand = this.getPokerHand(this.getRandomHand());
                sReturn += `\nNext round: You got "${this.oPlayerHand.sName}". \n\nAre you "IN" or do you want to "FOLD"?`;
            } 
        }
        else{
            sReturn = `Sorry I did not get that. Please choose a correct option.`;
        }

        if(this.nPlayerChips <= 0){
            sReturn += `Sorry ${this.sPlayersName}, I won this poker tournament. Want to play again?. Answer "continue" or "exit"`;
        }
        else if(this.nComputerChips <= 0){
            sReturn += `Congratulations ${this.sPlayersName}!!! you won this poker tournament. Want to play again?`;
        }

        if(sInput.toLowerCase() == "continue"){
            this.startGame();
            this.oPlayerHand = this.getPokerHand(this.getRandomHand());
            sReturn += `\nFirst Round: You got "${this.oPlayerHand.sName}". \n\nAre you "IN" or do you want to "FOLD"?`;
        }
        else if(sInput.toLowerCase()=="exit"){
            sReturn += `Thank you for playing ${this.sPlayersName}. See you next time. `;
            this.bWelcomeMessageShown = false;
            this.sPlayersName = false;
        }

        setTimeout(() => { 
            fCallback([sReturn]); 
        }, 1500);
        
    }
}