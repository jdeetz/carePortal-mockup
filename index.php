<?php
if(!isset($_COOKIE['loggedIn'])) {
    require 'loginPage.html';
} else {
    require 'index.html';
}
?>
