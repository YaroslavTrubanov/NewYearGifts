var myApp = angular.module('myApp', ['ngStorage', 'ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        //главная страница
    .when('/', {
        templateUrl: 'Index.cshtml',
        controller: 'HomeController',
    })
        //страница авторизации
    .when('/login', {
        templateUrl: 'Account/Login.cshtml',
        controller: 'AccountController'
    })
        //страница формирования товаров
    .when('/formalization', {
        templateUrl: 'Account/Formalization.cshtml',
        controller: 'AccountController'
    })
        //страница доставки товаров
    .when('/delivery', {
        templateUrl: 'Account/delivery.cshtml',
        controller: 'AccountController'
    })
        //страница деда мороза
    .when('/dashboard', {
        templateUrl: 'Account/Dashboard.cshtml',
        controller: 'AccountController'
    })
        //страница успешной авторизации
    .when('/success', {
        templateUrl: 'Account/Success.cshtml',
        controller: 'AccountController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

myApp.controller('GiftsListController', function GiftsListController($scope, $http, $localStorage, $sessionStorage) {
    //работа с таблицой Gifts
    $http.get('/home/GetGifts/')
        .success(function (result) {
            $scope.gifts = result;
        })
        .error(function (data) {
            //console.log(data);
            $scope.gifts = "Пожалуйста, перезагрузите страницу";
        });

    $scope.cart = $localStorage.$default({ cart: [] }); //определение localStorage с подмассивом cart

    if ($scope.cart.cart[0] != null) $scope.showEmptyCart = false;
    else $scope.showEmptyCart = true;

    $scope.orderArr = [];
    $scope.formSend = false;
    //предупреждения
    $("#cartWarning").hide();
    $("#successOrderText").hide();

    $scope.numbers = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    $scope.addToCart = function (gift, numbers) {
        if (numbers != undefined) {
            $scope.showEmptyCart = false;
            $scope.cart.cart.push(angular.extend({ quantity: numbers.value }, gift));
        }
    };

    //удаление элементов из корзины
    $scope.delete = function (idx) {
        var del = $scope.cart.cart[idx];
        if (del != null) {
            $scope.cart.cart.splice(idx, 1);
            //проверка на последний оставшийся элемент в корзине
            if ($scope.cart.cart[0] != null) $scope.showEmptyCart = false; 
            else $scope.showEmptyCart = true;
        }
    };

    //проверка количества товаров в корзине (не больше 5)
    $scope.checkOrder = function () {
        $scope.count = 0;
        var count = $scope.count;
        if ($scope.cart.cart.length > 0) {
            for (var i = 0; i < $scope.cart.cart.length; i++) {
                count += $scope.cart.cart[i].quantity;
            }
        };
        if (count > 0 && count <= 5) {
            for (var i = 0; i < $scope.cart.cart.length; i++) {
                var qty = $scope.cart.cart[i].quantity;
                while (qty > 0) {
                    $scope.orderArr.push($scope.cart.cart[i].GiftName);
                    qty--;
                };
            }
            return true;
        }
    }

    //оформление заказа
    $scope.checkout = function () {
        if ($scope.checkOrder()) {
            //alert('Yes!');
            $scope.formSend = true;
            $("#cartWarning").hide();
        }
        else $("#cartWarning").show();
    };

    //работа с таблицой Info
    $scope.customerName = ''; 
    $scope.address = document.getElementById('all_address'); //получаем адрес из html элемента
    $scope.addInfo = function () {
        var a = $scope.orderArr.toString();
        $http.post('/home/AddInfo/', { customerName: $scope.customerName, all_address: $scope.address.value, order: a })
            .success(function (result) {
                $scope.info = result;
                $scope.customerName = '';
                a = '';
                $scope.orderArr = [];
                $scope.cart.$reset(); //очищаем localStorage
                $scope.showEmptyCart = true;
                $("#successOrderText").show();
            })
            .error(function (data) {
                console.log(data);
            });
    };
});

myApp.controller('FormalizationController', function FormalizationController($scope, $http) {
    //работа с таблицой Info
    $http.get('/home/GetInfo/')
        .success(function (result) {
            $scope.info = result;
        })
        .error(function (data) {
            console.log(data);
        });
    
    //если "сформировать", то записывать в бд дату формирования и менять formalized на true
    $scope.formalize = function (item) {
        var id = item.OrderId;
        $scope.employee = document.getElementById('emp_name'); //получаем имя формирующего
        $scope.getDate = new Date();//генерируем время формирования
        item.Formalizated = true;//заказ сформирован
        $http.post('/home/FormalizeInfo/', { id: id, employeeName: $scope.employee.innerText, date: $scope.getDate, formal: item.Formalizated })
            .success(function (result) {
                $scope.info = result;
            })
            .error(function (data) {
                console.log(data);
            });
    };
});

myApp.controller('DeliveryController', function DeliveryController($scope, $http) {
    //работа с таблицой Info
    $http.get('/home/GetInfo/')
        .success(function (result) {
            $scope.info = result;
        })
        .error(function (data) {
            console.log(data);
        });

    //доставлен заказ
    $scope.done = function (item) {
        var id = item.OrderId;
        item.Delivered = true;
        $http.post('/home/DoneInfo', { id: id, deliv: item.Delivered })
            .success(function (result) {
                $scope.info = result;
            })
            .error(function (data) {
                console.log(data);
            });
    };

    //переформировать
    $scope.notDone = function (item) {
        var id = item.OrderId;
        item.Formalizated = false;
        $http.post('/home/ReformalizeInfo', { id: id, formal: item.Formalizated })
            .success(function (result) {
                $scope.info = result;
            })
            .error(function (data) {
                console.log(data);
            });
    };
});

myApp.controller('DashboardController', function DashboardController($scope, $http) {
    //работа с таблицой Info
    $http.get('/home/GetInfo/')
        .success(function (result) {
            $scope.info = result;
        })
        .error(function (data) {
            console.log(data);
        });
});

function goBack() {
    window.history.back();
}


myApp.filter('num', function () {
    return function (input) {
        if (input == true) return "Да";
        else return "Нет";
    };
});

myApp.filter('jsonDate', ['$filter', function ($filter) {
    return function (input, format) {
        return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    };
}]);