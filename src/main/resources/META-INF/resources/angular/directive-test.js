/**
 * This functions allows you to easily test the functionality of a directive. It
 * allows you to specify its name (as you would on a div in your HTML), the attributes
 * to pass to your directive, and the incoming scope attributes. This allows you to elegantly
 * test your directives behaviors.
 *
 * A typical invocation of this looks like this:

   describe("Moderation directive test", function() {

        var
            dir,
            approveCalled = false,
            approveReason = '',
            declineReason = ''
            ;

        // ------------------------------------------------------------
        //		Initialize
        // ------------------------------------------------------------

        beforeEach(module('app'));
        beforeEach(module('services'));

        beforeEach(inject(function($compile, $rootScope) {
            dir = directive(
                $compile,
                $rootScope,
                'va-moderation',
                {	// attrs
                    'moderation-type' : "Vacancy",
                    'on-approve' : 'onApprove',
                    'on-decline' : 'onDecline',
                    'can-modify' : 'false',
                    'model' : 'sharedModel'
                },
                {	// scope
                    sharedModel : {},
                    onApprove : function(reason) {
                        approveReason = reason;
                        approveCalled = true;
                    },
                    onDecline : function(reason) {
                        declineReason = reason;
                    }
                }
            );
        }));

        afterEach(function() {
            approveReason = '';
            declineReason = '';
            approveCalled = false;
        });

    });
 */
function directive($compile, $rootScope, name, attributes, scope) {
    /**
     * Create a list of key='val' value form
     */
    function parseAttributes() {
        return _.map(attributes, function(val, key) { return key + '="' + val + '" '; });
    }


    // create html
    var html =
        _.flatten(
            ["<div ", name, " ", parseAttributes(), "></div>"]
        ).join("");

    var objScope = $rootScope.$new();

    angular.extend(objScope, scope);

    // compile and find directive's objScope.
    $compile(angular.element(html))(objScope);
    objScope.$digest();

    var result = {
        scope : objScope.$$childTail,
        parentScope : objScope
    };

    return result;
}

