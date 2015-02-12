convert "1. Overall.jpg" -morphology Convolve DoG:15,100,0 -negate -normalize -blur 0x1 -channel RBG -level 60%%,91%%,0.1 "c1. Overall.jpg"
convert "2. Welcome, Big leader.jpg" -morphology Convolve DoG:15,100,0 -negate -normalize -blur 0x1 -channel RBG -level 60%%,91%%,0.1 "c2. Welcome, Big leader.jpg"
convert "3. Slim leader & flow.jpg" -morphology Convolve DoG:15,100,0 -negate -normalize -blur 0x1 -channel RBG -level 60%%,91%%,0.1 "c3. Slim leader & flow.jpg"
convert "4. Participant flow.jpg" -morphology Convolve DoG:15,100,0 -negate -normalize -blur 0x1 -channel RBG -level 60%%,91%%,0.1 "c4. Participant flow.jpg"
pause
