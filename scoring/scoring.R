
## read in data
# Create an empty dataframe to store the merged data
mooney <- data.frame()

# Get the list of files in the "data/" folder
file_list <- list.files("data/", full.names = TRUE)

# Check if the file_list is empty
if (length(file_list) == 0) {
  # Handle the case when no files are found in the folder
  print("No files found in the 'data/' folder.")
} else {
  # Loop through each file and merge it into the merged_data dataframe
  for (file in file_list) {
    # Read the CSV file
    data <- read.csv(file)
    
    # Merge the data into the merged_data dataframe
    mooney <- rbind(mooney, data)
  }
  
  # Print the merged_data dataframe
  print(mooney)
}

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

versionCheck <- function(df) {
  
  # convert dates
  df$interview_date <- as.Date(df$interview_date, "%m/%d/%Y")
  
  df$src_subject_id[df$src_subject_id == ""] <- NA
  mooney_dat <- df[complete.cases(df$src_subject_id),] # remove all NA subject_ids
  # impute NAs where strings exist in rev2+ output
  mooney_dat$response_face[mooney_dat$response_face == ""] <- NA
  mooney_dat$accuracy_face[mooney_dat$accuracy_face == ""] <- NA
  mooney_dat$response_gender[mooney_dat$response_gender == ""] <- NA
  mooney_dat$response_age[mooney_dat$response_age == ""] <- NA
  
  return(mooney_dat)
  
}

mooney_dat <- versionCheck(mooney)
# mooney_dat <- versionCheck(mooney_ground_truth)


## Function to summarize performance from the mooney faces task 
mooneyFacesPerformance <- function(data = mooney_faces){
  
  mooney_faces <- list()
  #Adjusted for missed trials (0.5 per missed trial); SDA variables
  upright_percent_reported_adjusted <- list() #upright reported + missed / 43 (adjusted for missed trials)
  inverted_percent_reported_adjusted <- list() #inverted reported + missed / 43 (adjusted for missed trials)
  scrambled_faces_reported <- list()
  scrambled_upright_faces_reported <- list()
  scrambled_inverted_faces_reported <- list()
  scrambled_percent_reported_adjusted <- list() # scrambled reported + missed / 20 (adjusted for missed trials)
  scrambled_upright_percent_reported_adjusted <- list() # scrambled upright reported + missed / 10 (adjusted for missed trials)
  scrambled_inverted_percent_reported_adjusted <- list() # scrambled inverted reported + missed / 10 (adjusted for missed trials)
  
  #Non-adjusted
  upright_percent_reported <- list()
  inverted_percent_reported <- list()
  scrambled_percent_reported <- list()
  scrambled_upright_percent_reported <- list()
  scrambled_inverted_percent_reported <- list()
  
  #Gender Age discrimination variables
  #Non-adjusted
  upright_face_reported_percent_correct <- list()
  upright_faces_reported <- list()
  upright_gender_correct <- list()
  upright_age_correct <- list()
  inverted_face_reported_percent_correct <- list()
  inverted_face_reported <- list()
  inverted_gender_correct <- list()
  inverted_age_correct <- list()

  
  # create a temporary dataframe to store mooney variables
  mooney_variables_list <- list()
  
  # constants
  total_upright_trials <- 43 # good variable name
  total_inverted_trials <- 43 # good variable name
  total_scrambled_trials <- 20 # good variable name
  total_scrambled_upright_trials <- 10
  total_scrambled_inverted_trials <- 10
  
  adjusted_upright_denominator <- list() # takes into account the missed trials
  adjusted_inverted_denominator <- list() # takes into account the missed trials
  adjusted_scrambled_denominator <- list()
  adjusted_scrambled_upright_denominator <- list()
  adjusted_scrambled_inverted_denominator <- list()

  

  


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
    #append to mooney_faces list subjects which have completed the catch Silverstein version and have at least 20 catch trials
    mooney_faces[[i]] <- mooney_dat[which(mooney_dat$src_subject_id == mooney_dat_subjects[i]),]
    
    
    
    ## faces upright (%)
    

    responses_to_upright_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & !is.na(mooney_faces[[i]]$response_face)),]

    gender_responses_to_upright_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & !is.na(mooney_faces[[i]]$response_gender)),] # this is subject-specific, taking into account only their responses

    age_responses_to_upright_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & !is.na(mooney_faces[[i]]$response_age)),] # this is subject-specific, taking into account only their responses
    
    
    # calculating face trials where subject did not respond
    missed_upright_face_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "original" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    
    # missed trials get half credit
    missed_upright_face_trials_partial_credit <- nrow(missed_upright_face_trials)/2 #divides missed upright face trials by two for partial credit
    
    # since there is no "ground truth" we are only interested in responses that = 1; accuracy_face should be removed from data collection
    upright_faces_reported <-  nrow(responses_to_upright_faces[which(responses_to_upright_faces$response_face == "1"),])

    # imputed denominator (must be 43)
    adjusted_upright_denominator[[i]] <- nrow(responses_to_upright_faces) + nrow(missed_upright_face_trials)
    
    # calculate percent correct of upright trials, adjusted for Signal Dectection Analysis
    upright_percent_reported_adjusted[[i]] <- ((upright_faces_reported + missed_upright_face_trials_partial_credit)/adjusted_upright_denominator[[i]]) * 100
    
    # calculate non adjusted percent faces reported of upright trials; Main variable of interest in MFT
    upright_percent_reported[[i]] <- (upright_faces_reported/total_upright_trials) * 100
    

    ## upright gender and age variables
    
    upright_gender_correct[[i]] <- nrow(gender_responses_to_upright_faces[which(gender_responses_to_upright_faces$response_gender == gender_responses_to_upright_faces$ground_truth_gender),]) + nrow(gender_responses_to_upright_faces[which(gender_responses_to_upright_faces$ground_truth_gender == "ambiguous"),])
    upright_age_correct[[i]] <- nrow(age_responses_to_upright_faces[which(age_responses_to_upright_faces$response_age == age_responses_to_upright_faces$ground_truth_age),]) + nrow(age_responses_to_upright_faces[which(age_responses_to_upright_faces$ground_truth_age == "ambiguous"),])
   
    
    ## faces inverted (%)
    
    
    responses_to_inverted_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & !is.na(mooney_faces[[i]]$response_face)),]
    
    gender_responses_to_inverted_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & !is.na(mooney_faces[[i]]$response_gender)),]
    
    age_responses_to_inverted_faces <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & !is.na(mooney_faces[[i]]$response_age)),]
    
    # calculating face trials where subject did not respond
    missed_inverted_face_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "inverted" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    
    # missed trials get half credit
    missed_inverted_face_trials_partial_credit <- nrow(missed_inverted_face_trials)/2 #divides missed inverted face trials by two for partial credit
    
    # since there is no "ground truth" we are only interested in responses that = 1; accuracy_face should be removed from data collection
    inverted_faces_reported <-  nrow(responses_to_inverted_faces[which(responses_to_inverted_faces$response_face == "1"),])
    
    # imputed denominator (must be 43)
    adjusted_inverted_denominator[[i]] <- nrow(responses_to_inverted_faces) + nrow(missed_inverted_face_trials)
    
    # calculate percent correct of inverted trials, adjusted for Signal Detection Analysis
    inverted_percent_reported_adjusted[[i]] <- ((inverted_faces_reported + missed_inverted_face_trials_partial_credit)/adjusted_inverted_denominator[[i]]) * 100
    
    # calculate non adjusted percent faces reported of inverted trials; Main variable of interest in MFT
    inverted_percent_reported[[i]] <- (inverted_faces_reported/total_inverted_trials) * 100
    
    ## inverted gender and age variables
    
    inverted_gender_correct[[i]] <- nrow(gender_responses_to_inverted_faces[which(gender_responses_to_inverted_faces$response_gender == gender_responses_to_inverted_faces$ground_truth_gender),]) + nrow(gender_responses_to_inverted_faces[which(gender_responses_to_inverted_faces$ground_truth_gender == "ambiguous"),])
    inverted_age_correct[[i]] <- nrow(age_responses_to_inverted_faces[which(age_responses_to_inverted_faces$response_age == age_responses_to_inverted_faces$ground_truth_age),]) + nrow(age_responses_to_inverted_faces[which(age_responses_to_inverted_faces$ground_truth_age == "ambiguous"),])
    
    
    ## faces scrambled (%)
    
    
    # isolate only participants who received catch/scrambled trials
    responses_to_scrambled_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "catch" & !is.na(mooney_faces[[i]]$response_face)),]

    # isolate scrambled upright and scrambled inverted trials via !180 - upright, 180 - inverted 9, 10
    responses_to_scrambled_upright_trials <- responses_to_scrambled_trials[grep("180.png", responses_to_scrambled_trials$stimulus, invert = TRUE),] # invert = TRUE removes -180 from stim to select only upright scrambled (catch) trials
    responses_to_scrambled_inverted_trials <- responses_to_scrambled_trials[grep("180.png", responses_to_scrambled_trials$stimulus),]

    # calculating scrambled face trials where subject did not respond
    missed_scrambled_face_trials <- mooney_faces[[i]][which(mooney_faces[[i]]$test_part == "catch" & is.na(mooney_faces[[i]]$response_face) & is.na(mooney_faces[[i]]$accuracy_face)& is.na(mooney_faces[[i]]$response_gender) & is.na(mooney_faces[[i]]$response_age)),]
    # took subset of missed scrambled face trials that are also upright images
    missed_scrambled_upright_face_trials <- missed_scrambled_face_trials[grep("180.png", missed_scrambled_face_trials$stimulus, invert = TRUE),]
    # took subset of missed scrambled face trials that are also inverted images
    missed_scrambled_inverted_face_trials <- missed_scrambled_face_trials[grep("180.png", missed_scrambled_face_trials$stimulus),]

    # missed trials get half credit
    missed_scrambled_face_trials_partial_credit <- nrow(missed_scrambled_face_trials)/2 #divides missed scrambled face trials by two for partial credit
    missed_scrambled_upright_face_trials_partial_credit <- nrow(missed_scrambled_upright_face_trials)/2 #divides missed scrambled face trials by two for partial credit
    missed_scrambled_inverted_face_trials_partial_credit <- nrow(missed_scrambled_inverted_face_trials)/2 #divides missed scrambled face trials by two for partial credit
    
    # calculate numerator and denominator values for scrambled faces reported calculation
    scrambled_faces_reported <-  nrow(responses_to_scrambled_trials[which(responses_to_scrambled_trials$response_face == "1"),])
    scrambled_upright_faces_reported <-  nrow(responses_to_scrambled_upright_trials[which(responses_to_scrambled_upright_trials$response_face == "1"),])
    scrambled_inverted_faces_reported <-  nrow(responses_to_scrambled_inverted_trials[which(responses_to_scrambled_inverted_trials$response_face == "1"),])

    # imputed denominator (20 for all scrambled; 10 for scrambled-upright; 10 for scrambled)
    adjusted_scrambled_denominator[[i]] <- nrow(responses_to_scrambled_trials) + nrow(missed_scrambled_face_trials)
    adjusted_scrambled_upright_denominator[[i]] <- nrow(responses_to_scrambled_upright_trials) + nrow(missed_scrambled_upright_face_trials)
    adjusted_scrambled_inverted_denominator[[i]] <- nrow(responses_to_scrambled_inverted_trials) + nrow(missed_scrambled_inverted_face_trials)

    # calculate non adjusted percent faces reported of scrambled, scrambled-upright, and scrambled_inverted trials; Main variable of interest in MFT
    scrambled_percent_reported[[i]] <- (scrambled_faces_reported/total_scrambled_trials) * 100
    scrambled_upright_percent_reported[[i]] <- (scrambled_upright_faces_reported/total_scrambled_upright_trials) * 100
    scrambled_inverted_percent_reported[[i]] <- (scrambled_inverted_faces_reported/total_scrambled_inverted_trials) * 100

    # calculate adjusted percent faces reported of scrambled, scrambled-upright, and scrambled_inverted trials; adjusted for Signal Detection Analysis
    scrambled_percent_reported_adjusted[[i]] <- (scrambled_faces_reported + missed_scrambled_face_trials_partial_credit)/adjusted_scrambled_denominator[[i]] * 100
    scrambled_upright_percent_reported_adjusted[[i]] <- ((scrambled_upright_faces_reported + missed_scrambled_upright_face_trials_partial_credit)/adjusted_scrambled_upright_denominator[[i]]) * 100
    scrambled_inverted_percent_reported_adjusted[[i]] <- ((scrambled_inverted_faces_reported + missed_scrambled_inverted_face_trials_partial_credit)/adjusted_scrambled_inverted_denominator[[i]]) * 100
    
    
    mooney_variables_list[[i]] <- data.frame(#subjectkey = unique(mooney_faces[[i]]$subjectkey),
                                                  src_subject_id = unique(mooney_faces[[i]]$src_subject_id),
                                                  site = unique(mooney_faces[[i]]$site),
                                                  interview_date = unique(mooney_faces[[i]]$interview_date),
                                                  #age = floor(unique(mooney_faces[[i]]$interview_age)[2]/12),
                                                  sex = unique(mooney_faces[[i]]$sex),
                                                  phenotype = unique(mooney_faces[[i]]$phenotype),
                                                  #handedness = unique(mooney_faces[[i]]$handedness)[2],
                                                
                                                  upright_faces_reported = upright_faces_reported,
                                                  ## Below line used to double check calculations of reported faces per condition
                                                  # adjusted_upright_denominator = adjusted_upright_denominator[[i]],
                                                  inverted_faces_reported = inverted_faces_reported,
                                                  ## Below line used to double check calculations of reported faces per condition
                                                  # adjusted_inverted_denominator = adjusted_inverted_denominator[[i]],
                                                  scrambled_faces_reported = scrambled_faces_reported,
                                                  scrambled_upright_faces_reported = scrambled_upright_faces_reported,
                                                  scrambled_inverted_faces_reported = scrambled_inverted_faces_reported,
                                                  ## Below lines used to double check calculations of reported faces per condition
                                                  # adjusted_scrambled_denominator = adjusted_scrambled_denominator[[i]],
                                                  # adjusted_scrambled_upright_denominator= adjusted_scrambled_upright_denominator[[i]],
                                                  # adjusted_scrambled_inverted_denominator = adjusted_scrambled_inverted_denominator[[i]],
                                                  
                                                  #Non-adjusted percent reported per condition
                                                  upright_percent_reported = round(upright_percent_reported[[i]],2),
                                                  inverted_percent_reported = round(inverted_percent_reported[[i]],2),
                                                  scrambled_percentage_reported = format(round(scrambled_percent_reported[[i]],digits=2),nsmall=2),
                                                  scrambled_upright_percentage_reported = format(round(scrambled_upright_percent_reported[[i]],digits=2),nsmall=2),
                                                  scrambled_inverted_percentage_reported = format(round(scrambled_inverted_percent_reported[[i]],digits=2),nsmall=2),
                                                  
                                                  #Adjusted percent reported per condition (SDA)
                                                  upright_percent_reported_adjusted = round(upright_percent_reported_adjusted[[i]],2),
                                                  inverted_percent_reported_adjusted = round(inverted_percent_reported_adjusted[[i]],2),
                                                  scrambled_percent_reported_adjusted = round(scrambled_percent_reported_adjusted[[i]],2),
                                                  scrambled_upright_percent_reported_adjusted = format(round(scrambled_upright_percent_reported_adjusted[[i]],digits=2),nsmall=2),
                                                  scrambled_inverted_percent_reported_adjusted = format(round(scrambled_inverted_percent_reported_adjusted[[i]],digits=2),nsmall=2),
                                                  
                                                  #missed trial variables per condition
                                                  missed_upright_face_trials = nrow(missed_upright_face_trials),
                                                  missed_inverted_face_trials = nrow(missed_inverted_face_trials),
                                                  missed_scrambled_face_trials = nrow(missed_scrambled_face_trials),
                                                  missed_scrambled_upright_face_trials = nrow(missed_scrambled_upright_face_trials),
                                                  missed_scrambled_inverted_face_trials = nrow(missed_scrambled_inverted_face_trials),
                                                  
                                                  #gender and age judgement variables per condition
                                                  upright_gender_correct = upright_gender_correct[[i]],
                                                  upright_gender_percent_correct = round((upright_gender_correct[[i]] / upright_faces_reported)*100,2),
                                                  upright_age_correct = upright_age_correct[[i]],
                                                  upright_age_percent_correct = round((upright_age_correct[[i]] / upright_faces_reported)*100,2),
                                                  inverted_gender_correct = inverted_gender_correct[[i]],
                                                  inverted_gender_percent_correct = round((inverted_gender_correct[[i]] / inverted_faces_reported)*100,2),
                                                  inverted_age_correct = inverted_age_correct[[i]],
                                                  inverted_age_percent_correct = round((inverted_age_correct[[i]] / inverted_faces_reported)*100,2)
         

                                                  
                                                  )
    
  }
  
  
  
  
  
  return(do.call(rbind.data.frame, mooney_variables_list))
  
  
}


# call mooneyFaces function
mooney_clean <- mooneyFacesPerformance(data = mooney)


