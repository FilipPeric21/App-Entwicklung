Schedueling





Problem:

mehr Prozesse als cpu kerne

aus kernel: Interaktion mit Hardware(disk,peripherie)

es kann nur ein Prozess je cpu kern ausgeführt werden

Welcher Prozess, und wenn wie lange;







Wann wird entschieden?



Neuer Prozess wird erstellt(fork,exec)

&#x09;Wer soll weiterlaufen - urpsrünglicher P oder neuer?



Prozess endet

&#x09;Was gibt's noch zutun?



Prozess ist blockiert

&#x09;Semaphore, warten auf Hardware



Interrupt

&#x09;Zeitgeber

&#x09;Hardware





Preemptive vs Non-preemprtive Scheduling (vorgebeugets oder nicht vorgebeugtes Planen von P)



Non-preemptive

&#x09;Os wartet, bis P entweder wartet(Sem.) oder endet



Preemptive

&#x09;Os selbst unterbricht P

&#x09;Setzt Interrupts vorraus







Power On

&#x09;								

