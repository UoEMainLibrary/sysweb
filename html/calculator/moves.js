

function getCopies(results) {
//console.log("in getCopies "+results);
  var location = {
    "0": {"a": "0", "b": "0", "c": "0"},
    "1": {"a": "1", "b": "0", "c": "0"},
    "2": {"a": "2", "b": "0", "c": "0"},
    "3": {"a": "3", "b": "0", "c": "0"},
    "4": {"a": "3", "b": "1", "c": "0"},
    "5": {"a": "3", "b": "1", "c": "1"},
    "6": {"a": "4", "b": "1", "c": "1"},
    "7": {"a": "4", "b": "2", "c": "1"},
    "8": {"a": "5", "b": "2", "c": "1"},
    "9": {"a": "5", "b": "3", "c": "1"},
    "10": {"a": "6", "b": "3", "c": "1"},
    "11": {"a": "7", "b": "3", "c": "1"},
    "12": {"a": "7", "b": "3", "c": "2"},
    "13": {"a": "7", "b": "4", "c": "2"},
    "14": {"a": "7", "b": "5", "c": "2"},
    "15": {"a": "7", "b": "5", "c": "3"},
    "16": {"a": "7", "b": "6", "c": "3"},
    "17": {"a": "7", "b": "7", "c": "3"},
    "18": {"a": "7", "b": "7", "c": "4"},
    "19": {"a": "8", "b": "7", "c": "4"},
    "20": {"a": "8", "b": "7", "c": "5"}
  }
  var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
//  console.log("cc "+currentCopies);
  var purchases = results - currentCopies;
  if (purchases < 0) { purchases = 0;}
//  console.log("purchase "+purchases);
  var purchaseResults = location[purchases]['a'];
//  console.log("pr "+purchaseResults);  
  var hubResults = location[results]['a'];
//  console.log("hr "+hubResults);
//  console.log("total "+results+" hub no "+hubResults+" purchases "+purchases+" purchase result "+purchaseResults);
  if (hubResults > purchaseResults) {
    hubResults = hubResults - purchaseResults;
  }
  else {
    hubResults = 0;
  }

  var totalCopies = "Total copies (including purchase requests): " + results + "<br>" + "Move to HUB Reserve: " + hubResults;

  // + "<br>" + "HUB Short Loan: " + location[results]['b'] + "<br>" + "Standard Loan: " +  location[results]['c'];
  return totalCopies;

};

function essential() {
  var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
  var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
//  console.log("curc "+currentCopies);
  if (students < 20 && currentCopies == 0) {
    results = 1;
  }
  else if (students < 20 && currentCopies > 0) {
    results = currentCopies;
  }
  else {
    results = students / 20; 
          if (results < 0) {
        results = 0;
//                console.log("autts "+results);
      }
      else if (results > 20) {
        results = 20;
//                console.log("cutts "+results);    
      }
      else {
        results = Math.round(results);
        if (Number.parseInt(results) - Number.parseInt(currentCopies) < 0) { results = 0; }
        else {
        results = Number.parseInt(results) - Number.parseInt(currentCopies);
        }
        results = Number.parseInt(results) + Number.parseInt(currentCopies);
//        console.log("resaddc "+results);
      }
    
  }
  document.getElementById("resultsBox").innerHTML = getCopies(results);
  return false;
}
//
// function recommended() {
//   var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
//   var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
//   if (students < 40 && currentCopies == 0) {
//     results = 1;
//   }
//   else if (students < 40 && currentCopies > 0) {
//     results = 0;
//   }
//   else {
//     results = students / 40 - currentCopies; {
//       if (results < 0) {
//         results = 0;
//       }
//       else if (results > 20) {
//         results = 20;
//       }
//       else {
//         results;
//       }
//     }
//   }
//   var total = "Total to order:"
//   document.getElementById("resultsBox").innerHTML = total + " " + Math.floor(results);
//   return false;
// }
//
// function further() {
//   var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
//   var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
//     results = 0;
//     var total = "Total to order:"
//     document.getElementById("resultsBox").innerHTML = total + " " + results;
//     return false;
// }
