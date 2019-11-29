<!DOCTYPE html>
<!--
@Copyright (C)2014-2019, Kibble Online Inc., in cooperation with Vancouver Film School
HTML5 + PHP App Template
-->
<html>
	<head>
	    <title>HTML5 App Demo</title>
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
        
	    <link rel='stylesheet' href='css/style.css'>

		<!-- This is the key CDN to pull jQuery from -->
		<!-- To operate offline we may want these to load from a local source -->
		<script src='//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>

	    <!-- Local styles -->
	    <style type='text/css'></style>

	</head>
    <body>
        <!-- The Structure of your app is here - Box model blocks of area -->
        <section id='app-frame'>

            <header id="intro">
                <h2 id="page-title">AJAX Demo Client</h2>
                <nav id='title' class='header container'>
                    <h3 class='content'>Nav Menu Area</h3>
                </nav>
            </header>
            <div class="clearfix"><!-- clear --></div>

	        <section id='wrapper' class='main flex-container'>

	            <aside id='sidebar' class='main container flex-item'>
	                <div id='sidebar-data' class='content'>
	                    <h4>Sidebar Area</h4>
	                </div>
	            </aside>

	            <div id='app-area' class='content container flex-item'>

	                <div id='game-screen'>

	                    <h3>My main app area here</h3>
	                    <div id='intro-screen'>
	                        <form id='nickname-form' method='POST' action='server/logon'>
	                            <label name='nick-name'>Name: </label>
	                            <input type='text'   name='nick-name' value='' />
	                            <input type='submit' name='action'    value='Submit' />
	                        </form>
	                    </div>

	                    <div id="test-form">
	                        <form id="validate-form" class="default-form"
	                              accept-charset="utf-8" method='POST' action='server/validate'>
	                            <input type="hidden" name="action" value="validate" />
	                            <input type="text" name="favorite_beverage" value="" placeholder="Favorite restaurant" />
	                            <input type="text" name="favorite_restaurant" value=""  placeholder="Favorite beverage" />
	                            <select name="gender">
	                                <option value="male">Male</option>
	                                <option value="female">Female</option>
	                            </select>
	                            <input type="submit" name="validate" value="Validate" />
	                        </form>
	                    </div>

	                    <div id='results-area'></div>

	                </div>
	            </div>
            </section> <!-- wrapper -->
        </section>

		<!--
			Load your app core here, while not strictly W3C compliant it guarentees
			that the basic HTML gets loaded and you have something to start
			debugging if any of your code fails.
		-->
		<script type="module" src='scripts/Main.js'></script>
	</body>
</html>
<!--

@Author: Scott Henshaw

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->