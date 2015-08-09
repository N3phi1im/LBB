(function () {
    'use strict';
    angular.module('app', ['ui.router', 'ui.bootstrap', 'infinite-scroll']).config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: 'views/home.html'
        }).state('Register', {
            url: '/Register',
            templateUrl: 'views/register.html'
        }).state('Login', {
            url: '/Login',
            templateUrl: 'views/login.html'
        }).state('Cat', {
            url: '/Cat',
            templateUrl: 'views/cat.html'
        }).state('Style', {
            url: '/Style',
            templateUrl: 'views/style.html'
        });
        $urlRouterProvider.otherwise('/');
    }
})();

(function () {
    'use strict';
    angular.module('app').controller('HomeController', HomeController);

    HomeController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "$state"];

    function HomeController(HomeFactory, UserFactory, BeerFactory, $state) {

        // Declarations

        var vm = this;
        vm.search = searchBeer;
        vm.getCategory = getCategory;
        vm.getStyle = getStyle;
        vm.results = BeerFactory.results;
        vm.cats = BeerFactory.cats;
        vm.styles = BeerFactory.styles;

        // Functions List

        function searchBeer(s) {
            BeerFactory.searchBeer(s).then(function () {});
        }

        function getCategory() {
            BeerFactory.getCategory().then(function () {
                $state.go('Cat');
            });
        }

        function getStyle() {
            BeerFactory.getStyle().then(function () {
                $state.go('Style');
            });
        }


    }
})();

(function () {
    'use strict';
    angular.module('app').controller('IndexController', IndexController);

    IndexController.$inject = ["UserFactory", "$state"];

    function IndexController(UserFactory, $state) {

        // Declarations

        var ix = this;
        ix.user = {};
        ix.status = UserFactory.status;
        ix.register = register;
        ix.login = login;
        ix.logout = UserFactory.logout;

        // Functions List

        function register() {
            var u = ix.user;
            if (!u.username || !u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
                $window.alert("Please fill all fields!")
                return false;
            }
            UserFactory.register(u).then(function () {
                ix.user = {};
                $state.go('Home');
            });
        }

        function login() {
            UserFactory.login(ix.user).then(function () {
                ix.user = {};
                $state.go('Home');
            });
        }
    }
})();

(function () {
    'use strict';
    angular.module('app').factory('BeerFactory', BeerFactory);

    BeerFactory.$inject = ['$http', '$q'];

    function BeerFactory($http, $q) {

        // Operations shortcuts

        var o = {};
        o.results = [];
        o.cats = [];
        o.styles = [];
        o.searchBeer = searchBeer;
        o.getCategory = getCategory;
        o.getStyle = getStyle;
        return o;

        // Functions list

        // Search Beer

        function searchBeer(search) {
            console.log(search);
            var q = $q.defer();
            $http.post('/api/Beer/searchBeer', search).success(function (res) {
                console.log(res);
                o.results.length = 0;
                for (var i = 0; i < res.length; i++) {
                    o.results.push(res[i]);
                    q.resolve();
                }
            });
            return q.promise;
        }

        // Show all Categories

        function getCategory() {
            var q = $q.defer();
            $http.post('/api/Beer/Category').success(function (res) {
                o.cats.length = 0;
                for (var i = 0; i <= 13; i++) {
                    o.cats.push(res[i]);
                    q.resolve();
                }
            });
            return q.promise;
        }

        // Show all Styles

        function getStyle() {
            var q = $q.defer();
            $http.post('/api/Beer/Style').success(function (res) {
                o.styles.length = 0;
                for (var i = 0; i < res.length; i++) {
                    o.styles.push(res[i]);
                    q.resolve();
                }
            });
            return q.promise;
        }
    }
})();

(function () {
    'use strict';
    angular.module('app').factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['$http', '$q'];

    function HomeFactory($http, $q) {

        // Operations shortcuts

        var o = {};

        return o;

        // Functions list

    }
})();

(function () {
    'use strict';
    angular.module('app').factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', '$state'];

    function UserFactory($http, $q, $state) {

        // Operations shortcuts

        var o = {};
        o.status = {};
        if (getToken()) {
            o.status.isLoggedIn = true;
            o.status.username = getUsername();
        }
        o.setToken = setToken;
        o.getToken = getToken;
        o.removeToken = removeToken;
        o.register = register;
        o.login = login;
        o.logout = logout;
        return o;

        // Functions list

        // Register User and Log them in

        function register(user) {
            var q = $q.defer();
            $http.post('/api/Users/Register', user).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        // Login User

        function login(user) {
            var u = {
                username: user.username.toLowerCase(),
                password: user.password
            };
            var q = $q.defer();
            $http.post('/api/Users/Login', u).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        // Logout User

        function logout() {
            o.status.isLoggedIn = false;
            removeToken();
            $state.go('Login');
        }

        // Put Token in Client Storage

        function setToken(token) {
            localStorage.setItem('token', token);
            o.status.username = getUsername();
        }

        // Get token from Client Storage

        function getToken() {
            return localStorage.token;
        }

        // Remove Token from Client

        function removeToken() {
            localStorage.removeItem('token');
            o.status.username = null;
        }

        // Get User Name

        function getUsername() {
            return JSON.parse(atob(getToken().split('.')[1])).username;
        }
    }
})();