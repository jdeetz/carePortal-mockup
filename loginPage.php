<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Please Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="theme-color" content="#D2E6FF" />
		<meta name="Description" content="Care Ecosystem is a functional monitoring research project" />
		<link rel="manifest" href="/manifest.json" /> <!-- PWA manifest -->
	</head>
	<body>
		<div id="main">
			<div style="text-align:center;width:100%">
				<img src="ceLogo.webp" width="500" alt="Care Ecosystem logo" />
			</div>
			<main> <!-- landmark for screen readers -->
				<div id="content">
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
				</div> <!-- This also contains the canvas used for rendering the graphs -->
			</main>
		</div>

		<!-- Scripts and stylesheets at the bottom, instead of the head, to improve page paint time -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script> <!-- p5.js include -->
		<link rel="stylesheet" type="text/css" href="style.css"></link> <!-- Relative link to external stylesheet -->
		<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet"> <!-- adding a font from Google's font library -->
		<script type="text/javascript" src="prefStorage.js" async></script> <!-- handles local storage of settings -->
		<script type="text/javascript" src="dataVis.js" async></script> <!-- Relative link to graph drawing script, which leverages p5.js -->
		<script type="text/javascript" src="dataHandler.js" async></script> <!-- Relative link to data handler script -->
	</body>
</html>
