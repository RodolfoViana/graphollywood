data <- read.csv("/home/iara/hackfest/graphollywood/formatData/actresses_awards.csv", sep=";", header = F)

names <- unique(data[,1])

actors <- as.data.frame(names)

actors[,1] = paste("0000000000000000",(actors[,1]),sep="")
actors[,1] = substring(actors[,1],(nchar(actors[,1])-6),nchar(actors[,1]))

actors$nominated = 0
actors$win = 0
actors$prop = 0

for(i in 1:length(names)){
  n = names[i]
  actor = data[data[,1] == n, ]
  
  actors[i,]$nominated = nrow(actor)
  actors[i,]$win = nrow(actor[actor[,3]=="1", ])
  actors[i,]$prop = nrow(actor[actor[,3]=="1", ])/nrow(actor)
}

sortudos = actors[actors$win > 0, ]
azarados = actors[actors$win == 0, ]

azarados = azarados[with(azarados, order(-azarados[,2])), ]
sortudos = sortudos[with(sortudos, order(-sortudos[,2])), ]

write.csv(azarados, "/home/iara/hackfest/graphollywood/formatData/atrizes_azarados.csv")
write.csv(sortudos, "/home/iara/hackfest/graphollywood/formatData/atrizes_sortudos.csv")

