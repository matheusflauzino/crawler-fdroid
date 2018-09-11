<?php 

require __DIR__ . '/vendor/autoload.php';

use QL\QueryList;

$ql = QueryList::getInstance();


$links = $ql->get('https://f-droid.org/en/packages/')->find('a.package-header')->attrs('href');

$allRepositories = $ql->get('https://f-droid.org/en/packages/community.fairphone.fplauncher3/')->find('li.package-link a')->attrs('href');



$page_begin = 1;
$page_max = 3;
$url_base = 'https://f-droid.org'; //https://f-droid.org/en/packages/2/index.html

$git_repositories = [];

for($i = $page_begin; $i <= $page_max; $i++) { //faz a paginação

    if($i>1) {
        $url_page = $url_base .'/en/packages/' . $i . '/index.html';
    } else {
        $url_page = $url_base . '/en/packages/';
    }


//    echo $url_page;
    $packages = $ql->get($url_page)->find('a.package-header')->attrs('href');

    foreach ($packages as $package) {
        $url_package = $url_base . $package;
        $repositories_package = $ql->get($url_package)->find('li.package-link a')->attrs('href');
        foreach ($repositories_package as $rep) {
            if(substr_count($rep,'https://github.com/') > 0 && substr_count($rep,'/') == 4 && !in_array($rep,$git_repositories)) {
                $git_repositories[]  = $rep;
            }

        }
    }
}

echo '<pre>';
print_r($git_repositories);
echo '</pre>';

