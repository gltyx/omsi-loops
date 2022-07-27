function loadChallenge() {
    switch (challenge) {
        case 1:
            gameSpeed = 2;

            Action.BuyManaZ1.canStart = function() {return totalMerchantMana > 0}
            Action.BuyManaZ1.manaCost = function() {return 1;}
            Action.BuyManaZ1.goldCost = function() {return 30;}
            Action.BuyManaZ1.finish = function() {
                let spendGold = Math.min(resources.gold, 300);
                let buyMana = Math.min(spendGold * this.goldCost(), totalMerchantMana);
                addMana(buyMana);
                totalMerchantMana -= buyMana;
                addResource("gold", -spendGold);
            }

            Action.BuyManaZ3.visible = function() {return false;}
            Action.BuyManaZ5.visible = function() {return false;}
        case 2:
            getSelfCombat = function() {
                if (challenge === 2) return Math.max(getZombieStrength(), getTeamStrength()) / 2;
                else return (getSkillLevel("Combat") + getSkillLevel("Pyromancy") * 5) * getArmorLevel() * (1 + getBuffLevel("Feast") * .05);
            }
        case 3:
            restart = function() {
                shouldRestart = false;
                timer = 0;
                timeCounter = 0;
                effectiveTime = 0;
                timeNeeded = 4320000 - totals.effectiveTime*50;
                document.title = "Idle Loops";
                resetResources();
                restartStats();
                for (let i = 0; i < towns.length; i++) {
                    towns[i].restart();
                }
                view.requestUpdate("updateSkills");
                actions.restart();
                view.requestUpdate("updateCurrentActionsDivs");
                view.requestUpdate("updateTrials", null);
            }
    }
}