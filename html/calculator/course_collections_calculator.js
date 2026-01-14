

function getCopies(results,res,shl,stl) {
	//console.log(results, res, shl, stl);
  var location = {
    "0": {"a": "0", "b": "0", "c": "0"},
    "1": {"a": "1", "b": "0", "c": "0"},
    "2": {"a": "2", "b": "0", "c": "0"},
    "3": {"a": "2", "b": "1", "c": "0"},
    "4": {"a": "2", "b": "2", "c": "0"},
    "5": {"a": "2", "b": "2", "c": "1"},
    "6": {"a": "3", "b": "2", "c": "1"},
    "7": {"a": "3", "b": "3", "c": "1"},
    "8": {"a": "3", "b": "4", "c": "1"},
    "9": {"a": "4", "b": "4", "c": "1"},
    "10": {"a": "4", "b": "4", "c": "2"},
    "11": {"a": "4", "b": "5", "c": "2"},
    "12": {"a": "5", "b": "5", "c": "2"},
    "13": {"a": "5", "b": "5", "c": "3"},
    "14": {"a": "5", "b": "6", "c": "3"},
    "15": {"a": "5", "b": "6", "c": "4"}
  }
  
  //Initialising variables
  	var totalCopies = Number(results) + Number(res) + Number(shl) + Number(stl);
  	//console.log("total copies: "+totalCopies);

  	var gridResTotal = location[totalCopies]['a']; //value assigned from grid above based on total copies held (totalCopies variable)
  	var gridShlTotal = location[totalCopies]['b']; // ditto
  	var gridStlTotal = location[totalCopies]['c']; // ditto
   	//console.log("total grid values: "+gridResTotal+" "+gridShlTotal+" "+gridStlTotal); // display values in console for testing 	
   	  	
  	var maxRes = gridResTotal; // setting max number of items held in Reserve
  	var maxShl = gridShlTotal; // setting max number of items held in Short Loan
  	var maxStl = gridStlTotal; // setting max number of items held in Standard Loan
  	
  	var gridRes = location[results]['a']; //value assigned from grid above based on copies to order (results variable from functions below)
  	var gridShl = location[results]['b']; // ditto
  	var gridStl = location[results]['c']; // ditto
	//console.log("grid values: "+gridRes+" "+gridShl+" "+gridStl); // display values in console for testing
	
  	var toRes = 0; // initialising variable for copies to order based on current holding
  	var toShl = 0; // ditto
  	var toStl = 0; // ditto
  	
  	var toMoveShl = 0; // initialising variable for rollover Reserve copies that will now be passed to Short Loan
  	var toMoveStl = 0; // initialising variable for rollover Short Loan copies that will now be passed to Standard Loan
  	var toMoveRes = 0; // initialising variable for rollover Standard Loan copies that will now be passed to Reserve Loan
  	
  	var moveExistingRes = 0; // initialising variable for rollover Standard Loan copies that will now be passed to Reserve Loan
  	var moveExistingShl = 0; // initialising variable for rollover Standard Loan copies that will now be passed to Reserve Loan
  	var moveExistingStl = 0; // initialising variable for rollover Standard Loan copies that will now be passed to Reserve Loan
	
	
	//Logic for Reserve items
  	if (res > maxRes) { // if number of copies already held is greater or equal to max number allowed
  		var toMoveShl = gridRes; //then set rollover value for Short Loan as the grid Reserve value
  		var moveExistingRes = Number(res) - Number(maxRes); //calculate the number of books that need to moved from existing stock
  		//console.log("in max res. to move shl value: " + toMoveShl); // logging for information
  	} else {
  		//console.log("in res else"); // loggin for information
  		var totalResHolding = Number(gridRes) + Number(res); //gets how many copies would be held if we order the assigned amount
  		
  			if (totalResHolding >= maxRes) { // if the total holding is higher or equal to the current allowed Reserve Holding.
  				//console.log("total res holding is over max res. holding is: "+totalResHolding); // logging for information
  				toMoveShl = Number(totalResHolding) - Number(maxRes);  // sets rollover value for short loan. is total holding minus max holding
  				//console.log("in res toMoveShl: "+toMoveShl);
  				var toRes = Number(maxRes) - Number(res); // set copies to order equal to the max number of res copies minus the copies held
  			} else {
  				//console.log("total res holding is under max res. HOlding is: "+totalResHolding); //logging for information
	  			var toRes = Number(gridRes); // set copies to order to the value in the grid
  			}
  	}	

	//Logic for Short Loan items
	if (shl > maxShl) { // if number of copies already held is greater or equal to max number allowed
	var moveExistingShl = Number(shl) - Number(maxShl);  //calculate the number of books that need to moved from existing stock
		if (toMoveShl > 0) { // if there's a toMoveShl value..
			var toMoveStl = Number(gridShl) + Number(toMoveShl); // rollover to Standard is the grid value for short plus the shl rollover value.
			
			//console.log("toMoveShl is greater than zero: "+toMoveShl+" toMoveStl is: "+toMoveStl); // logging for information
		} else { // there's no short loan rollover value
  			var toMoveStl = gridShl; //then set rollover value for Standard Loan as the grid ShortLoan value
  			//console.log("in max shl, no toMoveShl. to move stl value: " + toMoveStl); // no shl rollover so the value for standard loan rollover is the assigned grid value for short
  		}
  	} else {
  		//console.log("in shl else. value passed as rollover for short is: "+toMoveShl+" "+gridShl); //logging for information
  		var totalShlHolding = Number(shl) + Number(toMoveShl) + Number(gridShl); // gets the total short loan copies if we order the assigned amount (inc. rollovers)
  			
  			if (totalShlHolding >= maxShl) {
  				//console.log("total shl holding is over max shl. holding is: "+totalShlHolding); // logging for information
  				toMoveStl = Number(totalShlHolding) - Number(maxShl);  // sets rollover value for standard loan. is total holding minus max holding
  				//console.log("toMoveStl = "+toMoveStl);
  				var toShl = Number(maxShl) - Number(shl); // set copies to order equal to the max number of shl copies minus the copies held
  			} else {
  				//console.log("total shl holding is under shl res. Holding is: "+totalShlHolding); //logging for information
	  			var toShl = Number(gridShl) + Number(toMoveShl); // set copies to order to the value in the grid + rollovers
  			}
  	}
	
	//Logic for Standard Loan items
  	if (stl > maxStl) { // if number of copies already held is greater or equal to max number allowed
  		var toMoveRes = Number(gridStl) + Number(toMoveStl); //then set rollover value for Reserve Loan as the grid standard value
  		
  		var moveExistingStl = Number(stl) - Number(maxStl); //calculate the number of books that need to moved from existing stock
  		//console.log("in max stl. to move res value: " + toMoveRes); // logging for information
  	} else {
		//console.log("in stl. value passed as rollover for standard is: "+toMoveStl); //logging for information
  		var totalStlHolding = Number(stl) + Number(toMoveStl) + Number(gridStl); // gets the total standard loan copies if we order the assigned amount (inc. rollovers)
  			if (totalStlHolding >= maxStl) {
  				//console.log("total stl holding is over max stl. holding is: "+totalStlHolding); // logging for information
  				toMoveRes = Number(totalStlHolding) - Number(maxStl);  // sets rollover value for reserve loan. is total holding minus max holding
  				var toStl = Number(maxStl) - Number(stl); // set copies to order equal to the max number of stl copies minus the copies held	
  			} else {
  				//console.log("total stl holding is under stl res. Holding is: "+totalStlHolding); //logging for information
	  			var toStl = Number(gridStl) + Number(toMoveStl); // set copies to order to the value in the grid plus rollovers
  			}
		}
	//Adding spare copies to reserve/short when we exceed standard
	if (toMoveRes > 0) { // if there are copies to move to reserve
		//console.log("rollover from standard is: "+toMoveRes);  // logging for information
		var newRes = Number(toRes) + Number(toMoveRes); // add rollover to current reserve plus rollover
		if (newRes > maxRes) { // if adding rollover pushes over max
			//console.log("more than max res!!"); //logging for information
			var newShl = Number(toShl) + Number(toMoveRes);  // set new shl value to current shl plus holding rollover for short loan
			if (newShl > maxShl) { // if adding rollover pushes over max...
			// i honestly don't think we do anything here cos it's essentially a loop if we push it to short loan
			} else {
				var toShl = newShl; // set value for short loan to the sum of current plus rollover
			}
		} else {
			var toRes = newRes;
		}
		
	}
	
  var totalCopies = "<h3>NEW COPIES TO ORDER: " + results + "</H3><span style='font-size: small; color: blue;'>new purchases grid says: "+gridRes+" "+gridShl+" "+gridStl + "<br>ratio for total holdings says: "+gridResTotal+" "+gridShlTotal+" "+gridStlTotal + "</span><br>New for Reserve: " + toRes +" <br><span style='font-size: small; color: blue;'>max "+maxRes+". "+res+" already held</span><br>New for Short Loan: " + toShl + "<br><span style='font-size: small; color: blue;'>max "+maxShl+". "+shl+" already held</span><br>" + "New For Standard Loan: " + toStl +"<br><span style='font-size: small; color: blue;'>max "+maxStl+". "+stl+" already held</span><h3>MOVES TO MEET RATIO OF "+gridResTotal+" "+gridShlTotal+" "+gridStlTotal +"</h3>Reserve Copies to Move: "+moveExistingRes+"<br>Short Loan copies to Move: "+moveExistingShl+"<br>Standard Loan copies to Move: "+moveExistingStl;
  return totalCopies;

};

function essential() {
  var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
  var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
  var currentShlCopies = document.forms["acquisitions_tool_form"]["number_of_shl_copies"].value;
  var currentStlCopies = document.forms["acquisitions_tool_form"]["number_of_stl_copies"].value;
  
  var totalCurrentCopies = Number(currentCopies) + Number(currentShlCopies) + Number(currentStlCopies);

  //console.log("total copies: "+totalCurrentCopies);
  
  if (students < 20 && totalCurrentCopies == 0) {
    results = 1;
  }
  else if (students < 20 && totalCurrentCopies > 0) {
    results = 0;
  }
  else {
    if (students / 20 > 15) { var results = 15 - Number(totalCurrentCopies); }
    else { var results = students / 20 - Number(totalCurrentCopies); } 
      if (results < 0) {
        results = 0;
      }
      else {
        results;
      }
    
  }
  document.getElementById("resultsBox").innerHTML = getCopies(Math.round(results),currentCopies,currentShlCopies,currentStlCopies);
  return false;
}

function recommended() {
//console.log("in recommended");
  var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
  var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
  var currentShlCopies = document.forms["acquisitions_tool_form"]["number_of_shl_copies"].value;
  var currentStlCopies = document.forms["acquisitions_tool_form"]["number_of_stl_copies"].value;
  
  var totalCurrentCopies = Number(currentCopies) + Number(currentShlCopies) + Number(currentStlCopies);
  //console.log("total copies held: "+totalCurrentCopies);
  if (students < 40 && totalCurrentCopies == 0) {
    results = 1;
  }
  else if (students < 40 && totalCurrentCopies > 0) {
    results = 0;
  }
  else {
    if (students / 40 > 15) {var results = 15 - Number(totalCurrentCopies); }
    else { var results = students / 40 - Number(totalCurrentCopies); }
      if (results < 0) {
        results = 0;
      }
      else if (results > 15) {
        results = 15;
      }
      else {
        results;
      }
    
  }
  //console.log("recommended result "+results);
  var total = "Total to order: " + Math.round(results) + "<br>" + "Reserve: 0<br>" + "Short Loan: " + Math.round(results)+ "<br>" + "Standard Loan: 0";
  document.getElementById("resultsBox").innerHTML = total;
//    document.getElementById("resultsBox").innerHTML = getCopies(Math.round(results),currentCopies,currentShlCopies,currentStlCopies);
  return false;
}

//function further() {
//  var students = document.forms["acquisitions_tool_form"]["number_of_students"].value;
//  var currentCopies = document.forms["acquisitions_tool_form"]["number_of_copies"].value;
//    results = 0;
//    var total = "Total to order:"
//    document.getElementById("resultsBox").innerHTML = total + " " + results;
//    return false;
//}
