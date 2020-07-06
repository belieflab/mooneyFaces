let workerID = prompt( 'Enter SubID' );

const original = ['26.2', '45.2', '19.2', '24.2', '9.2', '20.2', '41.2', '39.2', '43.2', '22.2', '44.2', '25.2', '18.2', '27.2', '46.2', '42.2', '23.2', '21.2', '8.2', '38.2', '40.2', '34.2', '4.2', '10.2', '12.2', '6.2', '36.2', '32.2', '16.2', '14.2', '29.2', '30.2', '13.2', '7.2', '37.2', '35.2', '5.2', '11.2', '28.2', '15.2', '31.2', '33.2', '17.2']
const inverted = ['26.3', '24.3', '19.3', '45.3', '39.3', '41.3', '20.3', '9.3', '22.3', '43.3', '18.3', '46.3.1', '25.3', '44.3', '27.3', '23.3', '42.3', '40.3', '38.3', '8.3', '21.3', '10.3', '4.3', '34.3', '36.3', '6.3', '12.3', '16.3', '32.3', '30.3', '29.3', '14.3', '37.3', '7.3', '13.3', '11.3', '5.3', '35.3', '31.3', '15.3', '28.3', '17.3', '33.3']

let original_stimuli = [];
for (let i = 0; i < original.length ; i++){
  original_stimuli.push("stimuli/original/my_bitmap" + original[i] + ".jpg");
  // console.log(original_stimuli[i]);
}

let inverted_stimuli = [];
for (let i = 0; i < inverted.length ; i++){
  inverted_stimuli.push("stimuli/inverted/my_bitmap" + inverted[i] + ".jpg");
  // console.log(inverted_stimuli[i]);
}


let full_stim = [

  {stimulus: original_stimuli[0], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[1], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[2], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[3], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[4], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[5], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[6], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[7], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[8], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[9], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[10], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[11], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[12], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[13], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[14], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[15], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[16], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[17], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[18], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[19], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[20], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[21], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[22], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[23], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[24], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[25], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[26], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[27], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[28], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[29], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[30], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[31], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[32], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[33], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[34], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[35], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[36], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[37], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[38], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[39], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[40], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[41], data: {test_part: 'original', correct_response: '1'}},
  {stimulus: original_stimuli[42], data: {test_part: 'original', correct_response: '1'}},

  {stimulus: inverted_stimuli[0], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[1], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[2], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[3], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[4], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[5], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[6], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[7], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[8], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[9], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[10], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[11], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[12], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[13], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[14], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[15], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[16], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[17], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[18], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[19], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[20], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[21], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[22], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[23], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[24], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[25], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[26], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[27], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[28], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[29], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[30], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[31], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[32], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[33], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[34], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[35], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[36], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[37], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[38], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[39], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[40], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[41], data: {test_part: 'inverted', correct_response: '0'}},
  {stimulus: inverted_stimuli[42], data: {test_part: 'inverted', correct_response: '0'}},

]

let full_stim_shuffle = jsPsych.randomization.repeat(full_stim, 1); //shuffled array no repeats
