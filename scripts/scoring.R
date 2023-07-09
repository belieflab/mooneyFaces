
# STOP! If you did not open this as a project, do so NOW.
### (1) Open new project, select the Mooney Faces folder, click "open"
### (2) Open this script from the script folder


### Collaborators (auto-populated):
###
### joshkenney
### mkpappu
### tanya-tran
## Title: Mooney Faces
## Author: Praveen Suthaharan, Josh Kenney
## Description: Function to summarize performance from the mooney faces task 
## Input: Omnibus-based Mooney Faces Task Data
## Output: 
##         (1) Faces upright (%)
##         (2) Faces inverted (%)
##         (3) Faces scrambled (%)
##         (4) Correct answers
##         (5) Accuracy

# read in single file from omnibus
# NOTE: will later add code to read multiple files

# mongo updates will be necessary as new data is uploaded
# fix to task repo / data file implemented May 19 2022

# db.mooneyTest.updateMany(
#   {
#     test_part: "scrambed_upright",
#     response_face: { $eq: "1" }
#   },
#   { $set: { accuracy_catch: "false" } }
# );
# 
# db.mooneyTest.updateMany(
#   {
#     test_part: "scrambed_upright",
#     response_face: { $eq: "0" }
#   },
#   { $set: { accuracy_catch: "true" } }
# );
# 
# db.mooneyTest.updateMany(
#   {
#     test_part: "scrambled_inverted",
#     response_face: { $eq: "1" }
#   },
#   { $set: { accuracy_catch: "false" } }
# );
# 
# db.mooneyTest.updateMany(
#   {
#     test_part: "scrambled_inverted",
#     response_face: { $eq: "0" }
#   },
#   { $set: { accuracy_catch: "true" } }
# );
# 
# db.mooneyTest.updateMany(
#   { test_part: "scrambled_inverted" },
#   { $set: { test_part: "catch" } }
# );
# 
# 
# db.mooneyTest.updateMany(
#   { test_part: "scrambed_upright" },
#   { $set: { test_part: "catch" } }
# );
# 
# db.mooneyTest.updateMany({}, { $unset: { ground_truth: "" } });

## read in data
# Create an empty dataframe to store the merged data
mooney <- data.frame()

# Get the list of files in the "data/" folder
file_list <- list.files("data/", full.names = TRUE)

# Loop through each file and merge it into the merged_data dataframe
for (file in file_list) {
  # Read the CSV file
  data <- read.csv(file)
  
  # Merge the data into the merged_data dataframe
  mooney <- rbind(mooney, data)
}

# Print the merged_data dataframe
View(mooney)


# convert dates
as.Date(mooney$interview_date, "%m/%d/%Y")


mooney_dat <- mooney[complete.cases(mooney$src_subject_id),] # remove all NA subject_ids
# impute NAs where strings exist in rev2+ output
mooney_dat$response_face[mooney_dat$response_face == ""] <- NA
mooney_dat$accuracy_face[mooney_dat$accuracy_face == ""] <- NA
mooney_dat$response_gender[mooney_dat$response_gender == ""] <- NA
mooney_dat$response_age[mooney_dat$response_age == ""] <- NA



## Function to summarize performance from the mooney faces task 
mooneyFacesPerformance <- function(data = mooney_faces){
  
  mooney_faces <- list()
  upright_percent_correct <- list()
  upright_omitted_percent_correct <- list()
  inverted_percent_correct <- list()
  inverted_omitted_percent_correct <- list()
  scrambled_percent_correct <- list()
  scrambled_omitted_percent_correct <- list()
  scrambled_upright_percent_correct <- list()
  scrambled_upright_omitted_percent_correct <- list()
  scrambled_inverted_percent_correct <- list()
  scrambled_inverted_omitted_percent_correct <- list()
  
  upright_face_reported <- list()
  inverted_face_reported <- list()
  scrambled_face_reported <- list()
  scrambled_upright_face_reported <- list()
  scrambled_inverted_face_reported <- list()
  
  summary_MFT_performance_df <- list()
  
  
  all_upright_trials <- 43
  imputed_upright_denominator <- list()
  all_inverted_trials <- 43
  imputed_inverted_denominator <- list()
  all_scrambled_trials <- 20
  imputed_scrambled_denominator <- list()
  imputed_scrambled_upright_face_denominator <- list()
  imputed_scrambled_inverted_face_denominator <- list()
  all_scrambled_upright_trials <- 10
  all_scrambled_inverted_trials <- 10
  
  # missed_upright_trials <- 0
  # missed_inverted_trials <- 0
  # missed_scrambled_trials <- 0
  
  #file_number = c('20020','20033','20073')
  

  # rule out subjects that did not participate in the silverstein version of the task, which contains catch trials (as well as gender/age detection)
  mooney_catch_subjects <- unique(mooney_dat[which(mooney_dat$test_part == "catch"),]$src_subject_id)
  
  # also rule out subjects who did not receive all of the scrambled trials (<20)
  count_catch_cases <- c()
  
  for (i in 1:length(mooney_catch_subjects)){
    
    count_catch_cases[i] <- nrow(mooney_dat[which(mooney_dat$src_subject_id == mooney_catch_subjects[i] & mooney_dat$test_part == "catch"),])    
  }
  
  #subset
  subs_of_interest <- mooney_catch_subjects[which(count_catch_cases >= 20)] 

  complete_trials <- mooney_dat[mooney_dat$src_subject_id %in% subs_of_interest, ]
  
  # grab number of subjects - with catch trials
  mooney_dat_subjects <- unique(complete_trials[which(complete_trials$test_part == "catch"),]$src_subject_id)
  
  
  
  
  
  
  
  
  for (i in 1:length(mooney_dat_subjects)){
    
    # mooney_faces[[i]] <- read.csv(paste0('https://belieflab.yale.edu/capr/mooneyFaces/data/mooney_',file_number[i],'.csv'), 
    #                               stringsAsFactors = FALSE)
    
    mooney_faces[[i]] <- mooney_dat[which(mooney_dat$src_subject_id == mooney_dat_subjects[i]),]
    
    
    
    ## faces upright (%)
    
    # extract all faces upright trials
    upright_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & !is.na(mooney_faces[[i]]$response_face)),]
    
    # this solution interpolates NA values per Brian Keane
    missed_upright_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    
    #set.seed(123) # set the seed value to 123 (you can use any value you want)
    
    # loop to randomly impute missed trial dataframe for each subject
    if (nrow(missed_upright_trials) > 0) {
      for (k in 1:nrow(missed_upright_trials)){ # updating missing trials row-wise with imputed values
        # tmp <- mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k]
        # mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k] <- ifelse(is.na(tmp), sample(c("0","1"), 1, replace = TRUE),"")
        # 
        #missed_upright_trials$response_face[k] <- sample(c("0","1"), 1, replace = TRUE)
        missed_upright_trials$response_face[k] <- "0.5"
        
      }
    }
    
    # calculate numerator and denominator values for upright trials percent calculation
    upright_numerator <-  upright_trials[which(upright_trials$accuracy_face == "true"),]
    # if we need response_face, we need a conditional to impute true/false by comparing response_face in missed upright trials to correct_response
    upright_denominator <- upright_trials
    
    # imputed denominator (must be 43)
    imputed_upright_denominator[[i]] <- nrow(upright_trials) + nrow(missed_upright_trials)
    
    # calculate percent correct of upright trials
    upright_percent_correct[[i]] <- ((nrow(upright_numerator) + nrow(missed_upright_trials))/nrow(upright_denominator)) * 100
    upright_omitted_percent_correct[[i]] <- ((all_upright_trials - nrow(upright_trials))/all_upright_trials)*100
    
    
    # calculate numerator and denominator values for upright faces reported calculation
    upright_face_reported_numerator <-  upright_trials[which(upright_trials$response_face == "1"),]
    upright_face_reported_denominator <- upright_trials
    
    # calculate percent faces reported of upright trials
    upright_face_reported[[i]] <- ((nrow(upright_face_reported_numerator) + (nrow(missed_upright_trials)/2) ) / (nrow(upright_face_reported_denominator) + nrow(missed_upright_trials)) ) * 100
    
    
    ## faces inverted (%)
    
    # extract all faces inverted trials 
    inverted_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & !is.na(mooney_faces[[i]]$response_face)),]
    
    # this solution interpolates NA values per Brian Keane
    missed_inverted_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    
    #set.seed(123) # set the seed value to 123 (you can use any value you want)

    if (nrow(missed_inverted_trials) > 0) {
      for (k in 1:nrow(missed_inverted_trials)){ # updating missing trials row-wise with imputed values
        # tmp <- mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k]
        # mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k] <- ifelse(is.na(tmp), sample(c("0","1"), 1, replace = TRUE),"")
        # 
        # missed_inverted_trials$response_face[k] <- sample(c("0","1"), 1, replace = TRUE)
        missed_inverted_trials$response_face[k] <- "0.5"
        
      }
    }
    
    # calculate numerator and denominator values for upright trials percent calculation
    inverted_numerator <-  inverted_trials[which(inverted_trials$accuracy_face == "true"),]
    inverted_denominator <- inverted_trials
    
    # imputed denominator
    imputed_inverted_denominator[[i]] <- nrow(inverted_trials) + nrow(missed_inverted_trials)
    
    # calculate percent correct of upright trials
    inverted_percent_correct[[i]] <- ((nrow(inverted_numerator) + nrow(missed_inverted_trials))/nrow(inverted_denominator)) * 100
    inverted_omitted_percent_correct[[i]] <- ((all_inverted_trials - nrow(inverted_trials))/all_inverted_trials)*100
    
    # calculate numerator and denominator values for inverted faces reported calculation
    inverted_face_reported_numerator <-  inverted_trials[which(inverted_trials$response_face == "1"),]
    inverted_face_reported_denominator <- inverted_trials
    
    # calculate percent faces reported of inverted trials
    inverted_face_reported[[i]] <- ((nrow(inverted_face_reported_numerator) + (nrow(missed_inverted_trials)/2) )/(nrow(inverted_face_reported_denominator) + nrow(missed_inverted_trials)) ) * 100
    
    
    
    ## faces scrambled (%)
    
    # extract all faces inverted trials 19
    scrambled_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "catch" & !is.na(mooney_faces[[i]]$response_face)),]

    # this solution interpolates NA values per Brian Keane 1
    missed_scrambled_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "catch" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    
    if (nrow(missed_scrambled_trials) > 0) {
      for (k in 1:nrow(missed_scrambled_trials)){ # updating missing trials row-wise with imputed values
        # tmp <- mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k]
        # mooney_faces[[i]][which(is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face) & is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age) & mooney_faces[[i]]$src_subject_id == missed_trials_subjects[j]),]$response_face[k] <- ifelse(is.na(tmp), sample(c("0","1"), 1, replace = TRUE),"")
        # 
        #missed_scrambled_trials$response_face[k] <- sample(c("0","1"), 1, replace = TRUE)
        missed_scrambled_trials$response_face[k] <- "0.5"
        # if (missed_scrambled_trials$response_face[k] == "1") {
        #   missed_scrambled_trials$accuracy_catch[k] <- "true"
        # } else if (missed_scrambled_trials$response_face[k] == "0") {
        #   missed_scrambled_trials$accuracy_catch[k] <- "false"
        # }
        
      }
    }
    

    # !180 - upright, 180 - inverted 9, 10
    scrambled_upright_trials <- scrambled_trials[grep("180.png", scrambled_trials$stimulus, invert = TRUE),]
    scrambled_inverted_trials <- scrambled_trials[grep("180.png", scrambled_trials$stimulus),]
    
    # this solution interpolates NA values per Brian Keane 0,0
    missed_scrambled_upright_trials <- missed_scrambled_trials[grep("180.png", missed_scrambled_trials$stimulus, invert = TRUE),]
    missed_scrambled_inverted_trials <- missed_scrambled_trials[grep("180.png", missed_scrambled_trials$stimulus),]
    
    # calculate numerator and denominator values for scrambled trials percent calculation
    scrambled_numerator <-  scrambled_trials[which(scrambled_trials$accuracy_catch == "true"),]
    scrambled_denominator <- scrambled_trials
    
    # imputed denominator
    imputed_scrambled_denominator[[i]] <- nrow(scrambled_trials) + nrow(missed_scrambled_trials)
    
    # calculate percent correct of upright trials
    scrambled_percent_correct[[i]] <- ((nrow(scrambled_numerator) + (nrow(missed_scrambled_trials)/2))/nrow(scrambled_denominator)) * 100
    scrambled_omitted_percent_correct[[i]] <- ((all_scrambled_trials - nrow(scrambled_trials))/all_scrambled_trials)*100

    # calculate numerator and denominator values for scrambled faces reported calculation
    scrambled_face_reported_numerator <-  scrambled_trials[which(scrambled_trials$response_face == "1"),]
    scrambled_face_reported_denominator <- scrambled_trials
    
    # calculate percent faces reported of scrambled trials
    scrambled_face_reported[[i]] <- ( (nrow(scrambled_face_reported_numerator) ) / (nrow(scrambled_face_reported_denominator) + nrow(missed_scrambled_trials)) ) * 100
    
    
        
    # calculate numerator and denominator values for upright trials percent calculation
    scrambled_upright_numerator <-  scrambled_upright_trials[which(scrambled_upright_trials$accuracy_catch == "true"),]
    scrambled_upright_denominator <- scrambled_upright_trials
    
    # calculate percent correct of upright trials
    scrambled_upright_percent_correct[[i]] <- ((nrow(scrambled_upright_numerator) + nrow(missed_scrambled_upright_trials))/nrow(scrambled_upright_denominator)) * 100
    scrambled_upright_omitted_percent_correct[[i]] <- ((all_scrambled_upright_trials - nrow(scrambled_upright_trials))/all_scrambled_upright_trials)*100

    
    # calculate numerator and denominator values for scrambled-upright faces reported calculation
    scrambled_upright_face_reported_numerator <-  scrambled_upright_trials[which(scrambled_upright_trials$response_face == "1"),]
    scrambled_upright_face_reported_denominator <- scrambled_upright_trials
    
    # imputed denominator
    imputed_scrambled_upright_face_denominator[[i]] <- nrow(scrambled_upright_face_reported_denominator) + nrow(missed_scrambled_upright_trials)
    
    # calculate percent faces reported of scrambled-upright trials
    scrambled_upright_face_reported[[i]] <- ( (nrow(scrambled_upright_face_reported_numerator)  + (nrow(missed_scrambled_upright_trials)/2)) / (nrow(scrambled_upright_face_reported_denominator) + nrow(missed_scrambled_upright_trials)) ) * 100
    
        
    # calculate numerator and denominator values for upright trials percent calculation
    scrambled_inverted_numerator <-  scrambled_inverted_trials[which(scrambled_inverted_trials$accuracy_catch == "true"),]
    scrambled_inverted_denominator <- scrambled_inverted_trials
    
    # calculate percent correct of upright trials
    scrambled_inverted_percent_correct[[i]] <- ((nrow(scrambled_inverted_numerator) + nrow(missed_scrambled_inverted_trials))/nrow(scrambled_inverted_denominator)) * 100
    scrambled_inverted_omitted_percent_correct[[i]] <- ((all_scrambled_inverted_trials - nrow(scrambled_inverted_trials))/all_scrambled_inverted_trials)*100

    # calculate numerator and denominator values for scrambled-inverted faces reported calculation
    scrambled_inverted_face_reported_numerator <-  scrambled_inverted_trials[which(scrambled_inverted_trials$response_face == "1"),]
    scrambled_inverted_face_reported_denominator <- scrambled_inverted_trials
    
    # imputed denominator
    imputed_scrambled_inverted_face_denominator[[i]] <- nrow(scrambled_inverted_face_reported_denominator) + nrow(missed_scrambled_inverted_trials)
    
    # calculate percent faces reported of scrambled-inverted trials
    scrambled_inverted_face_reported[[i]] <- ( (nrow(scrambled_inverted_face_reported_numerator) + (nrow(missed_scrambled_inverted_trials)/2)) / (nrow(scrambled_inverted_face_reported_denominator) + nrow(missed_scrambled_inverted_trials)) ) * 100
    
    
    # #Format all percents into a table
    # mooney_faces_df <- data.frame(round(upright_percent_correct,2), 
    #                               round(inverted_percent_correct,2),
    #                               round(scrambled_percent_correct,2))
    # #Transposes dataframe to verticle orientation
    # mooney_faces_table <- t(mooney_faces_df)
    # #Names each row of the data table
    # rownames(mooney_faces_table) <- c("Upright",
    #                                   "Inverted",
    #                                   "Scrambled")
    # #Eliminates names of the table columns
    # colnames(mooney_faces_table) <- "Correct (%)"
    # 
    # 
    # #Format all percents into a table
    # mooney_faces_scrambled_df <- data.frame(round(scrambled_upright_percent_correct,2), 
    #                                         round(scrambled_inverted_percent_correct,2))
    # #Transposes dataframe to verticle orientation
    # mooney_faces_scrambled_table <- t(mooney_faces_scrambled_df)
    # #Names each row of the data table
    # rownames(mooney_faces_scrambled_table) <- c("Upright",
    #                                             "Inverted")
    # #Eliminates names of the table columns
    # colnames(mooney_faces_scrambled_table) <- "Scrambled Trials - Correct (%)"
    # 
    # #Format all percents into a table
    # mooney_faces_omitted_df <- data.frame(round(upright_omitted_percent_correct,2), 
    #                                         round(inverted_omitted_percent_correct,2),
    #                                         round(scrambled_omitted_percent_correct,2),
    #                                         round(scrambled_upright_omitted_percent_correct,2),
    #                                         round(scrambled_inverted_omitted_percent_correct,2))
    # #Transposes dataframe to verticle orientation
    # mooney_faces_omitted_table <- t(mooney_faces_omitted_df)
    # #Names each row of the data table
    # rownames(mooney_faces_omitted_table) <- c("Upright",
    #                                           "Inverted",
    #                                           "Scrambled",
    #                                           "Scrambled-Upright",
    #                                           "Scrambled-Inverted")
    # #Eliminates names of the table columns
    # colnames(mooney_faces_omitted_table) <- "Trials Omitted (%)"
    
    # Prints the table
    #mooney_faces_summary <- print(mooney_faces_table, quote = FALSE)
    #mooney_faces_scrambled_summary <- print(mooney_faces_scrambled_table, quote = FALSE)
    
    
    
    
    #list(mooney_faces_table, mooney_faces_scrambled_table, mooney_faces_omitted_table)
    
    
    summary_MFT_performance_df[[i]] <- data.frame(#subjectkey = unique(mooney_faces[[i]]$subjectkey),
                                                  src_subject_id = unique(mooney_faces[[i]]$src_subject_id),
                                                  site = unique(mooney_faces[[i]]$site),
                                                  interview_date = unique(mooney_faces[[i]]$interview_date),
                                                  #age = floor(unique(mooney_faces[[i]]$interview_age)[2]/12),
                                                  sex = unique(mooney_faces[[i]]$sex),
                                                  phenotype = unique(mooney_faces[[i]]$phenotype),
                                                  #handedness = unique(mooney_faces[[i]]$handedness)[2],
                                                  upright_correct = round(upright_percent_correct[[i]],2),
                                                  upright_omitted = round(upright_omitted_percent_correct[[i]],2),
                                                  inverted_correct = round(inverted_percent_correct[[i]],2),
                                                  inverted_omitted = round(inverted_omitted_percent_correct[[i]],2),
                                                  scrambled_correct = round(scrambled_percent_correct[[i]],2),
                                                  scrambled_omitted = round(scrambled_omitted_percent_correct[[i]],2),
                                                  scrambled_upright_correct = round(scrambled_upright_percent_correct[[i]],2),
                                                  scrambled_upright_omitted = round(scrambled_upright_omitted_percent_correct[[i]],2),
                                                  scrambled_inverted_correct = round(scrambled_inverted_percent_correct[[i]],2),
                                                  scrambled_inverted_omitted = round(scrambled_inverted_omitted_percent_correct[[i]],2),
                                                  upright_percentage_reported = round(upright_face_reported[[i]],2),
                                                  upright_denominator = imputed_upright_denominator[[i]],
                                                  inverted_percentage_reported = round(inverted_face_reported[[i]],2),
                                                  inverted_denominator = imputed_inverted_denominator[[i]],
                                                  scrambled_percentage_reported = round(scrambled_face_reported[[i]],2),
                                                  scrambled_denominator = imputed_scrambled_denominator[[i]],
                                                  scrambled_upright_percentage_reported = round(scrambled_upright_face_reported[[i]],2),
                                                  scrambled_upright_denominator = imputed_scrambled_upright_face_denominator[[i]],
                                                  scrambled_inverted_percentage_reported = round(scrambled_inverted_face_reported[[i]],2),
                                                  scrambled_inverted_denominator = imputed_scrambled_inverted_face_denominator[[i]],
                                                  missed_upright_trials = nrow(missed_upright_trials),
                                                  missed_inverted_trials = nrow(missed_inverted_trials),
                                                  missed_scrambled_trials = nrow(missed_scrambled_trials)
                                                  )
    
  }
  
  
  
  
  
  write.csv(do.call(rbind.data.frame, summary_MFT_performance_df), "tmp/MFT_performance_summary.csv", row.names = FALSE)
  
  
}


# call mooneyFaces function
mooneyFacesPerformance(data = mooney_faces)




# read in computed mooney data

mooney_faces_dat <- read.csv("scripts/tmp/MFT_performance_summary.csv")

mooney_faces_corrected_dat <- mooney_faces_dat[,c("src_subject_id",
                                        "phenotype",
                                        "upright_correct",
                                        "inverted_correct",
                                        "scrambled_correct",
                                        "scrambled_upright_correct",
                                        "scrambled_inverted_correct",
                                        "missed_upright_trials",
                                        "missed_inverted_trials",
                                        "missed_scrambled_trials")]

mooney_faces_reported_dat <- mooney_faces_dat[,c("src_subject_id",
                                                 "phenotype",
                                                 "interview_date",
                                                 "upright_percentage_reported",
                                                 "upright_denominator",
                                                 "inverted_percentage_reported",
                                                 "inverted_denominator",
                                                 "scrambled_percentage_reported",
                                                 "scrambled_denominator",
                                                 "scrambled_upright_percentage_reported",
                                                 "scrambled_upright_denominator",
                                                 "scrambled_inverted_percentage_reported",
                                                 "scrambled_inverted_denominator",
                                                 "missed_upright_trials",
                                                 "missed_inverted_trials",
                                                 "missed_scrambled_trials")]

colnames(mooney_faces_corrected_dat) <- c("src_subject_id",
                                          "phenotype",
                                          "upright_correct",
                                          "inverted_correct",
                                          "scrambled_correct",
                                          "scrambled_upright_correct",
                                          "scrambled_inverted_correct",
                                          "missed_upright_trials",
                                          "missed_inverted_trials",
                                          "missed_scrambled_trials")

colnames(mooney_faces_reported_dat) <- c("src_subject_id",
                                         "phenotype",
                                         "interview_date",
                                         "upright_percentage_reported",
                                         "upright_denominator",
                                         "inverted_percentage_reported",
                                         "inverted_denominator",
                                         "scrambled_percentage_reported",
                                         "scrambled_denominator",
                                         "scrambled_upright_percentage_reported",
                                         "scrambled_upright_denominator",
                                         "scrambled_inverted_percentage_reported",
                                         "scrambled_inverted_denominator",
                                         "missed_upright_trials",
                                         "missed_inverted_trials",
                                         "missed_scrambled_trials")

# mooney_faces_dat[which(is.na(mooney_faces_dat$scrambled_upright_correct)),]$scrambled_upright_correct <- 0
# mooney_faces_dat[which(is.na(mooney_faces_dat$scrambled_inverted_correct)),]$scrambled_inverted_correct <- 0
# 
# mooney_faces_reported_dat[which(is.na(mooney_faces_reported_dat$scrambled_upright_reported)),]$scrambled_upright_reported <- 0
# mooney_faces_reported_dat[which(is.na(mooney_faces_reported_dat$scrambled_inverted_reported)),]$scrambled_inverted_reported <- 0
# 

mooney_clean <- mooney_faces_reported_dat

createCsv(mooney_clean)

createCsv(mooney)
