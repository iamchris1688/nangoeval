"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchData(nango) {
    return __awaiter(this, void 0, void 0, function () {
        var repos, _loop_1, _i, repos_1, repo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paginate(nango, '/user/repos')];
                case 1:
                    repos = _a.sent();
                    _loop_1 = function (repo) {
                        var issues, mappedIssues;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, paginate(nango, "/repos/".concat(repo.owner.login, "/").concat(repo.name, "/issues"))];
                                case 1:
                                    issues = _b.sent();
                                    // Filter out pull requests
                                    issues = issues.filter(function (issue) { return !('pull_request' in issue); });
                                    mappedIssues = issues.map(function (issue) { return ({
                                        id: issue.id,
                                        owner: repo.owner.login,
                                        repo: repo.name,
                                        issue_number: issue.number,
                                        title: issue.title,
                                        state: issue.state,
                                        author: issue.user.login,
                                        author_id: issue.user.id,
                                        body: issue.body,
                                        date_created: issue.created_at,
                                        date_last_modified: issue.updated_at
                                    }); });
                                    if (!(mappedIssues.length > 0)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, nango.batchSave(mappedIssues, 'GithubIssue')];
                                case 2:
                                    _b.sent();
                                    return [4 /*yield*/, nango.log("Sent ".concat(mappedIssues.length, " issues from ").concat(repo.owner.login, "/").concat(repo.name))];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, repos_1 = repos;
                    _a.label = 2;
                case 2:
                    if (!(_i < repos_1.length)) return [3 /*break*/, 5];
                    repo = repos_1[_i];
                    return [5 /*yield**/, _loop_1(repo)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = fetchData;
function paginate(nango, endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var MAX_PAGE, results, page, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    MAX_PAGE = 100;
                    results = [];
                    page = 1;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, nango.get({
                            endpoint: endpoint,
                            params: {
                                limit: "".concat(MAX_PAGE),
                                page: "".concat(page)
                            }
                        })];
                case 2:
                    resp = _a.sent();
                    results = results.concat(resp.data);
                    if (resp.data.length == MAX_PAGE) {
                        page += 1;
                    }
                    else {
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, results];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLWlzc3VlLWV4YW1wbGUudHMiLCJzb3VyY2VzIjpbImdpdGh1Yi1pc3N1ZS1leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBOEIsU0FBUyxDQUFDLEtBQWdCOzs7Ozt3QkFFdEMscUJBQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsRUFBQTs7b0JBQTVDLEtBQUssR0FBRyxTQUFvQzt3Q0FFekMsSUFBSTs7Ozt3Q0FDSSxxQkFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLGlCQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxjQUFJLElBQUksQ0FBQyxJQUFJLFlBQVMsQ0FBQyxFQUFBOztvQ0FBaEYsTUFBTSxHQUFHLFNBQXVFO29DQUVwRiwyQkFBMkI7b0NBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO29DQUV0RCxZQUFZLEdBQWtCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDO3dDQUNyRCxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7d0NBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzt3Q0FDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3dDQUNmLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTTt3Q0FDMUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3dDQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7d0NBQ2xCLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7d0NBQ3hCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7d0NBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3Q0FDaEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxVQUFVO3dDQUM5QixrQkFBa0IsRUFBRSxLQUFLLENBQUMsVUFBVTtxQ0FDdkMsQ0FBQyxFQVpzRCxDQVl0RCxDQUFDLENBQUM7eUNBRUEsQ0FBQSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUF2Qix3QkFBdUI7b0NBQ3ZCLHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQWMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBL0QsU0FBK0QsQ0FBQztvQ0FDaEUscUJBQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFRLFlBQVksQ0FBQyxNQUFNLDBCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssY0FBSSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBQTs7b0NBQTNGLFNBQTJGLENBQUM7Ozs7OzswQkF0QjlFLEVBQUwsZUFBSzs7O3lCQUFMLENBQUEsbUJBQUssQ0FBQTtvQkFBYixJQUFJO2tEQUFKLElBQUk7Ozs7O29CQUFJLElBQUssQ0FBQTs7Ozs7O0NBeUJ6QjtBQTdCRCw0QkE2QkM7QUFFRCxTQUFlLFFBQVEsQ0FBQyxLQUFnQixFQUFFLFFBQWdCOzs7Ozs7b0JBQ2hELFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBRWpCLE9BQU8sR0FBVSxFQUFFLENBQUM7b0JBQ3BCLElBQUksR0FBRyxDQUFDLENBQUM7Ozt5QkFDTixJQUFJO29CQUNNLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUM7NEJBQ3pCLFFBQVEsRUFBRSxRQUFROzRCQUNsQixNQUFNLEVBQUU7Z0NBQ0osS0FBSyxFQUFFLFVBQUcsUUFBUSxDQUFFO2dDQUNwQixJQUFJLEVBQUUsVUFBRyxJQUFJLENBQUU7NkJBQ2xCO3lCQUNKLENBQUMsRUFBQTs7b0JBTkksSUFBSSxHQUFHLFNBTVg7b0JBRUYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVwQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFBRTt3QkFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQztxQkFDYjt5QkFBTTt3QkFDSCx3QkFBTTtxQkFDVDs7d0JBR0wsc0JBQU8sT0FBTyxFQUFDOzs7O0NBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOYW5nb1N5bmMsIEdpdGh1Yklzc3VlIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEobmFuZ286IE5hbmdvU3luYyk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgY29uc3QgcmVwb3MgPSBhd2FpdCBwYWdpbmF0ZShuYW5nbywgJy91c2VyL3JlcG9zJyk7XG5cbiAgICBmb3IgKGxldCByZXBvIG9mIHJlcG9zKSB7XG4gICAgICAgIGxldCBpc3N1ZXMgPSBhd2FpdCBwYWdpbmF0ZShuYW5nbywgYC9yZXBvcy8ke3JlcG8ub3duZXIubG9naW59LyR7cmVwby5uYW1lfS9pc3N1ZXNgKTtcblxuICAgICAgICAvLyBGaWx0ZXIgb3V0IHB1bGwgcmVxdWVzdHNcbiAgICAgICAgaXNzdWVzID0gaXNzdWVzLmZpbHRlcihpc3N1ZSA9PiAhKCdwdWxsX3JlcXVlc3QnIGluIGlzc3VlKSk7XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSXNzdWVzOiBHaXRodWJJc3N1ZVtdID0gaXNzdWVzLm1hcChpc3N1ZSA9PiAoe1xuICAgICAgICAgICAgaWQ6IGlzc3VlLmlkLFxuICAgICAgICAgICAgb3duZXI6IHJlcG8ub3duZXIubG9naW4sXG4gICAgICAgICAgICByZXBvOiByZXBvLm5hbWUsXG4gICAgICAgICAgICBpc3N1ZV9udW1iZXI6IGlzc3VlLm51bWJlcixcbiAgICAgICAgICAgIHRpdGxlOiBpc3N1ZS50aXRsZSxcbiAgICAgICAgICAgIHN0YXRlOiBpc3N1ZS5zdGF0ZSxcbiAgICAgICAgICAgIGF1dGhvcjogaXNzdWUudXNlci5sb2dpbixcbiAgICAgICAgICAgIGF1dGhvcl9pZDogaXNzdWUudXNlci5pZCxcbiAgICAgICAgICAgIGJvZHk6IGlzc3VlLmJvZHksXG4gICAgICAgICAgICBkYXRlX2NyZWF0ZWQ6IGlzc3VlLmNyZWF0ZWRfYXQsXG4gICAgICAgICAgICBkYXRlX2xhc3RfbW9kaWZpZWQ6IGlzc3VlLnVwZGF0ZWRfYXRcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmIChtYXBwZWRJc3N1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXdhaXQgbmFuZ28uYmF0Y2hTYXZlPEdpdGh1Yklzc3VlPihtYXBwZWRJc3N1ZXMsICdHaXRodWJJc3N1ZScpO1xuICAgICAgICAgICAgYXdhaXQgbmFuZ28ubG9nKGBTZW50ICR7bWFwcGVkSXNzdWVzLmxlbmd0aH0gaXNzdWVzIGZyb20gJHtyZXBvLm93bmVyLmxvZ2lufS8ke3JlcG8ubmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFnaW5hdGUobmFuZ286IE5hbmdvU3luYywgZW5kcG9pbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IE1BWF9QQUdFID0gMTAwO1xuXG4gICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG4gICAgbGV0IHBhZ2UgPSAxO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBuYW5nby5nZXQoe1xuICAgICAgICAgICAgZW5kcG9pbnQ6IGVuZHBvaW50LFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgbGltaXQ6IGAke01BWF9QQUdFfWAsXG4gICAgICAgICAgICAgICAgcGFnZTogYCR7cGFnZX1gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChyZXNwLmRhdGEpO1xuXG4gICAgICAgIGlmIChyZXNwLmRhdGEubGVuZ3RoID09IE1BWF9QQUdFKSB7XG4gICAgICAgICAgICBwYWdlICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuIl19