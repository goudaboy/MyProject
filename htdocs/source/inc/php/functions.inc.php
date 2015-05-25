<?php

	function createPage(){

		global $pathTemplate, $googleAnalytics, $pageTitle, $pathFavicon, $formURL, $pathImgLogo;

	    $template = phpQuery::newDocumentFileHTML($pathTemplate);

	    $template['head']->append($googleAnalytics);
	    $template['title']->html($pageTitle);
	    $template['link[rel="shortcut icon"]']->attr('href', $pathFavicon);

	    $template['form']->attr('action', $formURL);
	    $template['img[id=logo]']->attr('src',$pathImgLogo);
	
	    echo $template;

	}

?>