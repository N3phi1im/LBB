(function () {
    'use strict';
    angular.module('app', ['ui.router', 'ui.bootstrap']).config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: 'views/Home.html'
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
        }).state('Profile', {
            url: '/Profile',
            templateUrl: 'views/profile.html'
        }).state('Beer', {
            url: '/Beer',
            templateUrl: 'views/beer_profile.html'
        }).state('Profile_beer', {
            url: '/Profile_beer',
            templateUrl: 'views/profile_selected_beer.html'
        }).state('Wishlist', {
            url: '/Wishlist',
            templateUrl: 'views/wishlist.html'
        });
        $urlRouterProvider.otherwise('/');
    }
})();

(function () {
    'use strict';
    angular.module('app').controller('BeerController', BeerController);

    BeerController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "$state"];

    function BeerController(HomeFactory, UserFactory, BeerFactory, $state) {

        // Declarations

        var bc = this;
        bc.grabbed = BeerFactory.grabbed;
        bc.beers = {};
        // Functions List

        bc.grab = function (beer) {
            bc.beers.id = beer;
            BeerFactory.grab(bc.beers).then(function () {
                $state.go('Beer');
            });
        };


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
        vm.goHome = goHome;

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

        function goHome() {
            $state.go('Home');
        }

    }
})();

(function () {
    'use strict';
    angular.module('app').controller('IndexController', IndexController);

    IndexController.$inject = ["UserFactory", "ProfileFactory", "$state", "$window"];

    function IndexController(UserFactory, ProfileFactory, $state, $window) {

        // Declarations

        var ix = this;
        ix.user = {};
        ix.status = UserFactory.status;
        ix.register = register;
        ix.login = login;
        ix.logout = logout;

        // Functions List

        function register() {
            var u = ix.user;
            if (!u.username || !u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
                $window.alert("Please fill all fields!");
                return false;
            }
            UserFactory.register(u).then(function () {
                ix.user = {};
                $state.go('Profile');
            });
        }

        function login() {
            UserFactory.login(ix.user).then(function () {
                ix.user = {};
                $state.go('Profile');
            });
        }

        function logout() {
            ProfileFactory.beer_had.length = 0;
            ProfileFactory.beer_want.length = 0;
            UserFactory.logout();
        }

    }
})();

(function () {
    'use strict';
    angular.module('app').controller('ProfileController', ProfileController);

    ProfileController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "ProfileFactory", "$state"];

    function ProfileController(HomeFactory, UserFactory, BeerFactory, ProfileFactory, $state) {

        // Declarations

        var pc = this;
        pc.beer_had = ProfileFactory.beer_had;
        pc.beer_want = ProfileFactory.beer_want;
        pc.add_had = add_had;
        pc.add_want = add_want;
        pc.grab = grab;
        pc.grabbed = ProfileFactory.grabbed;
        ProfileFactory.getbeerhad();
        ProfileFactory.getbeerwant();

        // Functions List

        function add_had(beer) {
            ProfileFactory.add_had(beer).then(function () {
                $state.go('Profile');
            });
        }

        function add_want(beer) {
            ProfileFactory.add_want(beer).then(function () {
                $state.go('Home');
            });
        }

        function grab(beer, which) {
            ProfileFactory.grab(beer, which).then(function () {
                $state.go('Profile_beer');
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
        o.grabbed = [];
        o.cats = [];
        o.styles = [];
        o.searchBeer = searchBeer;
        o.grab = grab;
        o.getCategory = getCategory;
        o.getStyle = getStyle;
        return o;

        // Functions list

        // Search Beer

        function searchBeer(search) {
            var q = $q.defer();
            $http.post('/api/Beer/searchBeer', search).success(function (res) {
                o.results.length = 0;
                for (var i = 0; i < res.length; i++) {
                    o.results.push(res[i]);
                    q.resolve();
                }
            });
            return q.promise;
        }

        // Grab beer

        function grab(beer) {
            var q = $q.defer();
            $http.post('/api/Beer/grab', beer).success(function (res) {
                o.grabbed.length = 0;
                if (res) {
                    o.grabbed.push(res);
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
    angular.module('app').factory('ProfileFactory', ProfileFactory);

    ProfileFactory.$inject = ['$http', '$q'];

    function ProfileFactory($http, $q) {

        // Operations shortcuts

        var o = {};
        o.beer_had = [];
        o.beer_want = [];
        o.grabbed = [];
        o.grab = grab;
        o.add_had = add_had;
        o.add_want = add_want;
        o.getbeerhad = getbeerhad;
        o.getbeerwant = getbeerwant;
        return o;

        // Functions list

        // Add beer Had

        function add_had(beer) {
            var q = $q.defer();
            $http.post('/api/beers/beer_had', beer, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).success(function (res) {
                beer._id = res.id;
                beer.dateHad = new Date();
                o.beer_had.push(beer);
                q.resolve();
            }).error(function (res) {
                console.error('YOU DONE MESSED UP! A A RON!');
                q.reject(res);
            });
            return q.promise;
        }

        // Get beers Had

        function getbeerhad() {
            $http.get('/api/beers/beer_had', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).success(function (res) {
                o.beer_had.length = 0;
                for (var i = 0; i < res.length; i++) {
                    res[i].dateHad = new Date(res[i].dateHad);
                    o.beer_had.push(res[i]);
                }
            });
        }

        // Add beer Had

        function add_want(beer) {
            var q = $q.defer();
            $http.post('/api/beers/beer_want', beer, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).success(function (res) {
                beer._id = res.id;
                o.beer_want.push(beer);
                q.resolve();
            }).error(function (res) {
                console.error('YOU DONE MESSED UP! A A RON!');
                q.reject(res);
            });
            return q.promise;
        }

        // Get Beer Wishlist

        function getbeerwant() {
            $http.get('/api/beers/beer_want', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).success(function (res) {
                o.beer_want.length = 0;
                for (var i = 0; i < res.length; i++) {
                    o.beer_want.push(res[i]);
                }
            });
        }

        function grab(id, which) {
            var q = $q.defer();
            $http.get('/api/beers/grab/' + which + '/' + id).success(function (res) {
                o.grabbed.length = 0;
                if (res) {
                    o.grabbed.push(res);
                    q.resolve();
                }
            });
            return q.promise;
        }

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