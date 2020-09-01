
# Title: Mooney Faces Task Cleaning & Scoring Script
# Author: Trevor Williams (tfwillia@buffalo.edu)


# Load necessary packages
library(tidyverse)


# Searches directory for all data files (DOUBLE-CHECK THESE FOR YOU COMPUTER)
### For PC
#setwd("C:/xampp/htdocs/mooneyFaces/data")
setwd("./data")
file_list <- list.files(path="C:/xampp/htdocs/mooneyFaces/data", pattern = ".csv$")
### For Mac
#setwd("~/.bitnami/stackman/machines/xampp/volumes/root/htdocs/mooneyFaces/data")
#file_list <- list.files(path="~/.bitnami/stackman/machines/xampp/volumes/root/htdocs/mooneyFaces/data",pattern = ".csv$")


# Imports and scores data
ld <- data.frame()
for (i in 1:length(file_list)){
  ### reads each individual data file
  temp_data <- read.csv(file_list[i])   
  ### creates participant ID
  temp_data$ID <- sapply(strsplit(gsub(".csv", "", file_list[i]), "_"), function(x){x[2]}) 
  ### creates initial variables
  temp_data$o_corr <- ifelse(temp_data$test_part=="original",ifelse(temp_data$correct=="true",1,0),0)
  temp_data$i_corr <- ifelse(temp_data$test_part=="inverted",ifelse(temp_data$correct=="true",1,0),0)
  temp_data$o_err <- ifelse(temp_data$test_part=="original",ifelse(temp_data$correct=="false",1,0),0)
  temp_data$i_err <- ifelse(temp_data$test_part=="inverted",ifelse(temp_data$correct=="false",1,0),0)
  ### creates scored variables
  temp_data$orig_corr_tot <- sum(temp_data$o_corr)
  temp_data$invt_corr_tot <- sum(temp_data$i_corr)
  temp_data$orig_err_tot <- sum(temp_data$o_err)
  temp_data$invt_err_tot <- sum(temp_data$i_err)
  temp_data$orig_corr_pct <- round((sum(temp_data$o_corr)/43)*100,digits = 2)
  temp_data$invt_corr_pct <- round((sum(temp_data$i_corr)/43)*100,digits = 2)
### for each iteration, binds the new data to the main dataset
ld <- rbind(ld, temp_data) 
}


# Creates wide dataset for output
  ### creates stimulus ID
  ld$string <- gsub(".jpg","",ld$stimulus) 
  ld$stimid <- substring(ld$string,regexpr("bitmap",ld$string)+6)
  ### remove unnecessary rows and columns
  ld$test_part[ld$test_part==''] <- NA
  ld$remove <- ifelse(is.na(ld$test_part),1,ifelse(ld$test_part=="fixation",1,0))
  drops <- c("ld$key_press","trial_type","time_elapse",
            "internal_node_id","correct_response","correct",
            "o_corr","i_corr","o_err","i_err","remove","stimulus","key_press",
            "trial_index","test_part","time_elapsed","string")
  clean <- ld[ld$remove==0,!(names(ld) %in% drops)]
  ### fixes reaction time
  clean$rt <- as.numeric(clean$rt)
  clean$rt <- round(clean$rt,digits=2)
  ### sorts by ID and stimid
  clean$stimid[clean$stimid=="46.3.1"] <- "46.31"
  clean$ID <- as.numeric(clean$ID)
  clean$stimid <- as.numeric(clean$stimid)
  sorted <- clean[order(clean$ID,clean$stimid),]
  ### creates wide data
  
  names <- c("ID", "orig_corr_tot", "invt_corr_tot","orig_err_tot",
  "invt_err_tot", "orig_corr_pct", "invt_corr_pct")
  wide <-reshape(sorted,timevar="stimid",idvar=names,direction = "wide")

 
# write out processed files
  write.csv(wide, file = "C:/xampp/htdocs/mooneyFaces/export/mooney_data.csv")
  





