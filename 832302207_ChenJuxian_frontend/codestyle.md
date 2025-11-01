# codestyle.md — Spring Boot (Google Java Style Guide + Spring 补充)

## 1. 总体说明
本规范以 **Google Java Style Guide**（Java）为基准，结合 Spring Boot 推荐的项目结构与常见社区约定，目的是保证代码一致性、可读性与可维护性。团队应把此文件放在仓库根目录并在新成员入职时说明。

---

## 2. 格式与缩进
- **缩进**：每个块缩进 **2 个空格**。不要使用 Tab。  
- **每行长度**：**100 字符**为软限制，极端情况可允许，但应尽量保持在 100 内。  
- **单条语句一行**（one statement per line）。

**示例**
```java
if (condition) {
  doSomething();
  doAnotherThing();
}
```

---

## 3. 命名规范
遵循 Java 标准命名：
- 包名：小写，反域名（例如 `com.company.project`）。
- 类名：`UpperCamelCase`（例如 `UserController`）。
- 方法名/变量名：`lowerCamelCase`。
- 常量（`static final`）：**全大写，用下划线分隔**（例如 `MAX_RETRIES`）。实例 `final` 字段仍用 `lowerCamelCase`。

---

## 4. 文件与包结构（Spring Boot 约定）
推荐按照 **功能/域（feature）或层（layer）** 划分包，保持可扩展性与可测试性。常见结构示例：

```
src/main/java/com/company/project
├── ProjectApplication.java        // main application
├── config/                        // 配置类
├── controller/                    // REST controllers
├── service/                       // 业务逻辑
├── repository/                    // 数据访问（Spring Data JPA）
├── domain/                        // 实体/模型
├── dto/                           // DTOs
└── util/                          // 工具类
```

**原则**：`@SpringBootApplication` 主类放在根包上层，保证组件扫描覆盖子包。

---

## 5. 类成员顺序与组织
按一致顺序组织类成员以便可读性。推荐顺序（示例）：
1. 常量 `private static final`
2. 成员变量（按访问权限分组：`private` → `protected` → `public`）
3. 构造器（public → package-private）
4. `@PostConstruct` / 生命周期方法
5. 公共 API（public）方法
6. 受保护 / 包私有方法
7. 私有方法
8. 内部类 / 枚举

---

## 6. 注释与 JavaDoc
- 公共类和公共方法必须有 JavaDoc，简要说明用途与重要约束（参数、返回值、异常）。
- 复杂逻辑在方法内部应添加行内注释，但不要过度注释显而易见的代码。

**示例**
```java
/**
 * Retrieves user by id.
 *
 * @param id user id
 * @return user DTO or Optional.empty() if not found
 */
public Optional<UserDto> findById(Long id) { ... }
```

---

## 7. Imports
- 按顺序组织 imports：标准库 → 第三方库 → 本项目；每组之间留空行。使用具体类导入（不要使用 `*`）。

---

## 8. 注解（Annotations）顺序（对 Spring 特别约定）
- 在类或方法上使用多个注解时，保持固定顺序以便可读性。常见顺序（从上到下）示例：
  - `@RestController` / `@Controller`
  - `@RequestMapping`（类级别）
  - `@Validated`
  - `@Autowired` / 构造器注入（推荐使用构造器注入而非字段注入）
- 推荐使用构造器注入并尽量避免字段注入。

**示例（构造器注入）**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUser(@PathVariable Long id) { ... }
}
```

---

## 9. 日志（Logging）
- 使用 `org.slf4j.Logger`（通常通过 `LoggerFactory.getLogger(...)`）而非 `System.out.println`。
- 在类级别定义 `private static final Logger logger = LoggerFactory.getLogger(MyClass.class);`。
- 记录要有意义：避免打印敏感信息（密码、个人隐私）、避免过度日志。

---

## 10. 异常处理
- 使用显式、语义化的异常（自定义业务异常继承 RuntimeException）。
- Controller 层使用 `@ControllerAdvice` + `@ExceptionHandler` 统一映射 HTTP 错误码和消息，避免在业务代码中直接返回 ResponseEntity。
- 尽量不要吞掉异常（catch 后空处理），至少记录日志或重新抛出。

---

## 11. REST 风格约定（Controller）
- 资源 URI 使用复数名词：`/api/users`，CRUD 对应 HTTP 方法：`GET`/`POST`/`PUT`/`DELETE`。
- 返回合适的 HTTP 状态码（201 Created / 204 No Content / 404 Not Found 等）。
- 请求/响应使用 DTO，不要直接暴露实体（Entity）。

---

## 12. 单元测试与集成测试
- 单元测试（Mockito / JUnit）放在 `src/test/java` 与主包对称的包路径下。
- 对 Service 逻辑采用纯单元测试（无需 Spring 上下文），需要 Spring 的测试用 `@SpringBootTest` 或 `@WebMvcTest` 根据场景使用。
- CI 中执行测试并失败即阻断合并。

---

## 13. 工具链与自动格式化
- 团队强烈建议使用 `google-java-format` 或 `spotless`（配合 `google-java-format`）在 CI / pre-commit 钩子中格式化代码，保证所有提交的一致性。
- 推荐在 IDE 中安装 `google-java-format` 插件；并在 CI（Maven/Gradle）中加入格式检查与自动格式化步骤。

**示例（Gradle + Spotless）**
```groovy
plugins {
  id 'com.diffplug.spotless' version '6.0.0'
}
spotless {
  java {
    googleJavaFormat()
  }
}
```

---

## 14. 代码审查（Code Review）要点
- 可读性优先：是否易于理解？命名是否清晰？方法是否过长？
- 单一职责：类/方法是否只做一件事？
- 测试覆盖：关键逻辑是否有單元测试？边界条件是否被考虑？
- 安全与隐私：有没有泄露敏感数据？输入是否验证？

---

## 15. 常见示例（快速参考）

**常量**
```java
private static final int MAX_PAGE_SIZE = 50;
```

**Controller 返回 201**
```java
@PostMapping
public ResponseEntity<UserDto> createUser(@RequestBody UserCreateDto dto) {
  UserDto created = userService.create(dto);
  URI location = URI.create("/api/users/" + created.getId());
  return ResponseEntity.created(location).body(created);
}
```

**Service 注入（构造器）**
```java
@Service
public class UserService {
  private final UserRepository repo;
  public UserService(UserRepository repo) { this.repo = repo; }
}
```

---

## 16. 何处补充 / 定制
- 本文件为团队基线；具体的命名细节（例如 Controller 方法顺序、异常命名规则等）可由项目在此基础上进一步补充与细化。
- 建议在仓库中同时维护 IDE 配置（`.editorconfig`、IntelliJ settings）与格式化工具配置（spotless/checkstyle/google-java-format），确保一致性。

---

## 17. 参考资料（建议阅读）
- Google Java Style Guide
- Spring Boot 官方文档（项目结构与最佳实践）
- google-java-format / spotless



