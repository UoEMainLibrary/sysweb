<?php
// Display Number Boxes
echo "<main id='boxes'>";
echo "<h2>A snapshot of current library holdings and users</h2>";
foreach (new FilesystemIterator('csvs') as $fileinfo) {
    //echo $fileinfo->getFilename() . "<br>\n";
    $filez = $fileinfo->getFilename();
    $filez = "csvs/".$filez;
if (preg_match("/tl_.*/",$filez)) {


$content = file_get_contents($filez);
$lines = file($filez);
echo "<div class='numberbox'>";
foreach($lines as $line_num => $line) {
	$line = str_replace('"', '', $line);
	if ($line_num == 0) {
	echo "<span class='title'>$line</span><br>";
	}
	if ($line_num == 6) {

	$values = explode(",",$line);
	echo $values[1];
	//echo "$line_num: $line<br>";
		}
}
echo "</div>";

}
}
echo "</div>";
echo "</main>";
echo "<p><hr></p>";
echo "<main id='boxes'>";
echo "<h2>Overview of services provided by the library to enhance library users' experience</h2>";
foreach (new FilesystemIterator('csvs') as $fileinfo) {
    //echo $fileinfo->getFilename() . "<br>\n";
    $filez = $fileinfo->getFilename();
    $filez = "csvs/".$filez;
if (preg_match("/sv_.*/",$filez)) {


$content = file_get_contents($filez);
$lines = file($filez);
echo "<div class='servicebox'>";
foreach($lines as $line_num => $line) {
	$line = str_replace('"', '', $line);
	if ($line_num == 0) {
	echo "<span class='title'>$line</span><br>";
	}
	if ($line_num == 6) {

	$values = explode(",",$line);
	echo $values[1];
	//echo "$line_num: $line<br>";
		}
}
echo "</div>";

}
}
echo "</div>";
echo "</main>";
echo "<p>&nbsp;</p>";
?>
